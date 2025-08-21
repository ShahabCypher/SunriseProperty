import { asyncHandler } from "../../middleware/errorHandler.js";
import * as authService from "./auth.service.js";

// Register new user
export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  // Set refresh token as httpOnly cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);

  // Set refresh token as httpOnly cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

// Refresh access token
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token required",
    });
  }

  const result = await authService.refreshAccessToken(refreshToken);

  // Set new refresh token as httpOnly cookie
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  await authService.logoutUser(req.user._id, refreshToken);

  // Clear refresh token cookie
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Logout from all devices
export const logoutAll = asyncHandler(async (req, res) => {
  await authService.logoutAllDevices(req.user._id);

  // Clear refresh token cookie
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out from all devices successfully",
  });
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user._id, currentPassword, newPassword);

  // Clear refresh token cookie to force re-login
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Password changed successfully. Please log in again.",
  });
});

// Get current user profile
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: {
      user: req.user,
    },
  });
});

// Check if user is authenticated
export const checkAuth = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    data: {
      user: req.user,
      isAuthenticated: true,
    },
  });
});
