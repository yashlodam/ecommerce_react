import axios from "axios";
import { store } from "../State/Store";
import { setAccessToken } from "../State/AuthSlice";
import { toast } from "../common/toast";

// Resolve API base URL:
// 1. Primary: VITE_API_BASE_URL
// 2. Backwards-compatible alias: VITE_API_URL
// 3. Fallback: "" (uses Vite dev server proxy to http://localhost:5454)
const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "";

export const API_BASE_URL = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, "") : "";
export const API_URL = API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Ensure cookies (e.g. HttpOnly refreshToken) are sent and received with cross-origin requests
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

  const storedRefreshToken = localStorage.getItem("refreshToken");

  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        { refreshToken: storedRefreshToken || undefined },
        {
          withCredentials: true,
          headers: storedRefreshToken ? { "X-Refresh-Token": storedRefreshToken } : {},
        }
      );
      const data = response.data;
      if (data?.jwt) {
        store.dispatch(setAccessToken(data.jwt));
        localStorage.setItem("jwt", data.jwt);
      }
      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data?.role) {
        localStorage.setItem("role", data.role);
      }
      return data;
    } catch (error) {
      store.dispatch(setAccessToken(null));
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
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

// ─── RESPONSE INTERCEPTOR (SILENT REFRESH ON 401 & RENDER COLD-START RECOVERY) ─
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

    // ─── RENDER FREE TIER COLD-START RESILIENCY ──────────────────────────────
    // Render spins down free instances after 15m inactivity. First request takes 30-50s
    // and may fail with network timeout, 502 Bad Gateway, 503, or 504.
    const isColdStart =
      !error.response ||
      error.response.status === 502 ||
      error.response.status === 503 ||
      error.response.status === 504;

    if (isColdStart && originalRequest) {
      const method = (originalRequest.method || "get").toLowerCase();
      const isIdempotent = method === "get" || method === "head";

      // Safe automatic retry only for read-only / idempotent queries
      // NEVER auto-retry POST, PUT, DELETE, PATCH (prevents duplicate orders/payments)
      if (isIdempotent) {
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        if (originalRequest._retryCount <= 3) {
          if (originalRequest._retryCount === 1) {
            toast.info(
              "Connecting to ShopSphere cloud servers. Service is warming up...",
              { id: "render-cold-start-toast", duration: 5000 }
            );
          }

          // Exponential backoff: 2s, 4s, 6s
          const delay = Math.min(
            2000 * Math.pow(2, originalRequest._retryCount - 1),
            6000
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return api(originalRequest);
        }
      }
    }

    // Attach human-readable error explanation for UI consumers
    if (!error.response) {
      error.userMessage =
        "Unable to connect to server. The service may be starting up. Please wait a moment and retry.";
    } else if (error.response.status === 502 || error.response.status === 503) {
      error.userMessage =
        "Server is currently warming up. Please retry in a few seconds.";
    }

    return Promise.reject(error);
  }
);

// ─── HEALTH CHECK UTILITY ─────────────────────────────────────────────────────
export const checkServerHealth = async () => {
  try {
    const res = await axios.get(`${API_URL}/health`, { timeout: 10000 });
    return res.data?.status === "UP";
  } catch {
    return false;
  }
};