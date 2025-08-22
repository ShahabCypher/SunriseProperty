import { useState, useEffect } from "react";
import authService from "services/authService";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        const token = authService.getAccessToken();

        if (token) {
          // Validate token and get user info from backend
          try {
            const userResponse = await authService.getMe();
            if (userResponse.success && userResponse.data) {
              setIsAuthenticated(true);
              setUser(userResponse.data);
            } else {
              setIsAuthenticated(false);
              setUser(null);
              authService.logout();
            }
          } catch (userError) {
            // Token is invalid or expired, clear auth state
            console.error("Failed to get user info:", userError);
            setIsAuthenticated(false);
            setUser(null);
            authService.logout();
          }
        } else {
          // No token found
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear auth state on any error
        setIsAuthenticated(false);
        setUser(null);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    setIsAuthenticated(true);
    setUser(result.data.user);
    return result;
  };

  const register = async (name, email, password) => {
    const result = await authService.register(name, email, password);
    setIsAuthenticated(true);
    setUser(result.data.user);
    return result;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const refreshUserData = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userResponse = await authService.getMe();
        if (userResponse.success && userResponse.data) {
          setUser(userResponse.data);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      // If refresh fails, user might need to log in again
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    refreshUserData,
  };
};
