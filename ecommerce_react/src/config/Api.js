import axios from "axios";
import { store } from "../State/Store";

// In development, Vite proxy handles routing → baseURL is just "/"
// In production, set VITE_API_URL to your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
// Automatically attach the JWT from Redux state (or localStorage as fallback)
// to every outgoing request. This removes the need for manual header passing.
api.interceptors.request.use(
  (config) => {
    // Try Redux store first (single source of truth), then localStorage as fallback
    const state = store.getState();
    const token = state?.auth?.jwt || localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
// Handle 401 Unauthorized globally — auto-logout the user when JWT expires.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear session and redirect to login
      localStorage.removeItem("jwt");

      // Only redirect if not already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);