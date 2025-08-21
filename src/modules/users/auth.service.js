import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "./users.model.js";
import { AppError } from "../../middleware/errorHandler.js";

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  return { accessToken, refreshToken };
};

// Register new user
export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Save refresh token
  await user.addRefreshToken(refreshToken);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// Login user
export const loginUser = async (email, password) => {
  // Find user and include password for comparison
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is deactivated. Please contact support.", 401);
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Save refresh token
  await user.addRefreshToken(refreshToken);

  // Remove password from response
  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// Refresh access token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError("User not found or inactive", 401);
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(
      (token) => token.token === refreshToken
    );
    if (!tokenExists) {
      throw new AppError("Invalid refresh token", 401);
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id
    );

    // Replace old refresh token with new one
    await user.removeRefreshToken(refreshToken);
    await user.addRefreshToken(newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Refresh token expired", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid refresh token", 401);
    }
    throw error;
  }
};

// Logout user
export const logoutUser = async (userId, refreshToken) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (refreshToken) {
    await user.removeRefreshToken(refreshToken);
  }

  return { message: "Logged out successfully" };
};

// Logout from all devices
export const logoutAllDevices = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await user.clearRefreshTokens();

  return { message: "Logged out from all devices successfully" };
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Verify current password
  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError("Current password is incorrect", 400);
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Clear all refresh tokens to force re-login
  await user.clearRefreshTokens();

  return { message: "Password changed successfully" };
};
