import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

// api instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Store for retry logic
let isRefreshing = false;
let failedQueue = [];
let isRedirecting = false;

const redirectToLogin = (reason) => {
  if (isRedirecting) return;
  if (window.location.pathname.startsWith("/auth")) return;
  isRedirecting = true;
  console.warn(`[Auth] ${reason}`);
  TokenManager.clearTokens();
  window.location.href = "/auth/signin";
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// handle token expiration with automatic refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      redirectToLogin("Refresh token is invalid/expired, clearing session");
      return Promise.reject(error);
    } else if (
      error.response?.status === 400 &&
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      redirectToLogin("Refresh token cookie missing or invalid, clearing session");
      return Promise.reject(error);
    } else if (error.response?.status === 401 && !originalRequest._retry) {
      // No access token means already logged out — don't attempt refresh
      if (!Cookies.get("accessToken")) {
        redirectToLogin("No access token, redirecting to login");
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      if (!originalRequest.url.includes("/auth/refresh-token")) {
        try {
          const response = await api.post("/auth/refresh-token");

          const { data } = response.data;
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          TokenManager.setTokens(newAccessToken, newRefreshToken);
          console.log("[Auth] Token refreshed successfully", new Date().toISOString());

          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          isRefreshing = false;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;

          // Refresh failed — redirect to login
          redirectToLogin(`Token refresh failed: ${refreshError?.message}`);
          return Promise.reject(refreshError);
        }
      } else {
        // Refresh endpoint called directly, clear tokens and redirect
        isRefreshing = false;
        TokenManager.clearTokens();
      }
    }

    return Promise.reject(error);
  }
);

// token management functions
export const TokenManager = {
  setTokens: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, {
      expires: 1,
      secure: window.location.protocol === "https:",
      sameSite: "lax",
    });
  },

  getAccessToken: () => {
    return Cookies.get("accessToken");
  },

  getRefreshToken: () => {
    return null;
  },

  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  },

  isAuthenticated: () => {
    return !!Cookies.get("accessToken");
  },
};

export default api;
