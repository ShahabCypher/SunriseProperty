import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  clearError,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthInitialized,
} from "store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const initialized = useAppSelector(selectAuthInitialized);

  // Actions
  const login = useCallback(
    async (email, password) => {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      } else {
        throw new Error(result.payload || "Login failed");
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (name, email, password) => {
      const result = await dispatch(registerUser({ name, email, password }));
      if (registerUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      } else {
        throw new Error(result.payload || "Registration failed");
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
  }, [dispatch]);

  const refreshUserData = useCallback(async () => {
    await dispatch(getCurrentUser());
  }, [dispatch]);

  const refreshAuthToken = useCallback(async () => {
    const result = await dispatch(refreshAccessToken());
    if (refreshAccessToken.fulfilled.match(result)) {
      return result.payload;
    } else {
      throw new Error(result.payload || "Token refresh failed");
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,

    // Actions
    login,
    register,
    logout,
    refreshUserData,
    refreshAuthToken,
    clearError: clearAuthError,
  };
};
