import { asyncHandler } from "../../middleware/errorHandler.js";
import * as authService from "./auth.service.js";

const isSecureRequest = (req) =>
  req.secure || req.headers["x-forwarded-proto"] === "https";

// Register new user
export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  const secure = isSecureRequest(req);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);

  const secure = isSecureRequest(req);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
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

  const secure = isSecureRequest(req);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  await authService.logoutUser(req.user._id, refreshToken);

  const secure = isSecureRequest(req);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Logout from all devices
export const logoutAll = asyncHandler(async (req, res) => {
  await authService.logoutAllDevices(req.user._id);

  const secure = isSecureRequest(req);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out from all devices successfully",
  });
});

// Change password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user._id, currentPassword, newPassword);

  const secure = isSecureRequest(req);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
  });

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
