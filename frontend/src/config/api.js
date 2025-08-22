import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// add authorization header
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

// handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      if (!window.location.pathname.includes("/auth/")) {
        window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(error);
  }
);

// token management functions
export const TokenManager = {
  setTokens: (accessToken, refreshToken) => {
    // set secure cookies (httpOnly in production)
    Cookies.set("accessToken", accessToken, {
      expires: 1,
      secure: import.meta.env.VITE_PROD,
      sameSite: "strict",
    });

    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: import.meta.env.VITE_PROD,
        sameSite: "strict",
      });
    }
  },

  getAccessToken: () => {
    return Cookies.get("accessToken");
  },

  getRefreshToken: () => {
    return Cookies.get("refreshToken");
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
