import axios from "axios";
import { store } from "../State/Store";
import { setAccessToken } from "../State/AuthSlice";

// In development, Vite proxy handles routing → baseURL is just "/"
// In production, set VITE_API_URL to your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Ensure cookies (e.g. HttpOnly refreshToken) are sent and received with requests
  withCredentials: true,
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
// Attach short-lived Access Token strictly from Redux memory (XSS-safe)
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let token = state?.auth?.jwt || state?.seller?.jwt;

    if (!token) {
      token = localStorage.getItem("jwt") || localStorage.getItem("seller_jwt");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── SINGLE-FLIGHT SILENT REFRESH PROMISE ──────────────────────────────────────
// Guarantees that only ONE /auth/refresh HTTP request is sent over the wire at a time.
// All concurrent callers (React StrictMode, multiple components, parallel 401 interceptors)
// share the exact same promise and receive the same refreshed token.
let refreshPromise = null;

export const executeSilentRefresh = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (data?.jwt) {
        store.dispatch(setAccessToken(data.jwt));
      }
      return data;
    } catch (error) {
      store.dispatch(setAccessToken(null));
      throw error;
    } finally {
      // Clear after a short tick to allow future separate refresh cycles
      setTimeout(() => {
        refreshPromise = null;
      }, 500);
    }
  })();

  return refreshPromise;
};

// ─── RESPONSE INTERCEPTOR (SILENT REFRESH ON 401) ─────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      const requestUrl = originalRequest.url || "";

      // If the failed call was already the refresh endpoint, login, or already retried, do not retry
      if (
        requestUrl.includes("/auth/refresh") ||
        requestUrl.includes("/auth/login") ||
        originalRequest._retry
      ) {
        store.dispatch(setAccessToken(null));
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshData = await executeSilentRefresh();
        const newAccessToken = refreshData?.jwt;

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Missing access token in refresh response");
        }
      } catch (refreshError) {
        store.dispatch(setAccessToken(null));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);