import api, { TokenManager } from "config/api";

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { data } = response.data;

      // Store tokens in cookies
      if (data.accessToken) {
        TokenManager.setTokens(data.accessToken, data.refreshToken);
      }

      return response.data;
    } catch (error) {
      // Handle Axios errors
      const message =
        error.response?.data?.message || error.message || "Login failed";
      throw new Error(message);
    }
  }

  async register(name, email, password) {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { data } = response.data;

      // Store tokens in cookies
      if (data.accessToken) {
        TokenManager.setTokens(data.accessToken, data.refreshToken);
      }

      return response.data;
    } catch (error) {
      // Handle Axios errors
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      throw new Error(message);
    }
  }

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
      // Continue with local cleanup even if request fails
    } finally {
      // Always clear tokens locally
      TokenManager.clearTokens();
    }
  }

  async getMe() {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to get user info";
      throw new Error(message);
    }
  }

  async refreshToken() {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh-token", {
        refreshToken,
      });

      const { data } = response.data;

      // Update tokens
      if (data.accessToken) {
        TokenManager.setTokens(
          data.accessToken,
          data.refreshToken || refreshToken
        );
      }

      return response.data;
    } catch (error) {
      // If refresh fails, clear all tokens
      TokenManager.clearTokens();
      const message =
        error.response?.data?.message ||
        error.message ||
        "Token refresh failed";
      throw new Error(message);
    }
  }

  getAccessToken() {
    return TokenManager.getAccessToken();
  }

  isAuthenticated() {
    return TokenManager.isAuthenticated();
  }
}

export default new AuthService();
