import { asyncHandler } from "../../middleware/errorHandler.js";
import * as userService from "./users.service.js";

// Get all users (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers(req.query);

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// Get user by ID (admin only)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: {
      user,
    },
  });
});

// Get current user profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user._id);

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: {
      user,
    },
  });
});

// Update current user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUserProfile(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      user,
    },
  });
});

// Update user by admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUserByAdmin(
    req.params.id,
    req.body,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: {
      user,
    },
  });
});

// Delete user (admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Permanently delete user (super admin only)
export const permanentlyDeleteUser = asyncHandler(async (req, res) => {
  const result = await userService.permanentlyDeleteUser(
    req.params.id,
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// Reactivate user (admin only)
export const reactivateUser = asyncHandler(async (req, res) => {
  const user = await userService.reactivateUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User reactivated successfully",
    data: {
      user,
    },
  });
});

// Get user statistics (admin only)
export const getUserStats = asyncHandler(async (req, res) => {
  const stats = await userService.getUserStats();

  res.status(200).json({
    success: true,
    message: "User statistics retrieved successfully",
    data: stats,
  });
});

// Search users
export const searchUsers = asyncHandler(async (req, res) => {
  const { q: searchTerm, ...filters } = req.query;

  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
    });
  }

  const users = await userService.searchUsers(searchTerm, filters);

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    data: {
      users,
      searchTerm,
      count: users.length,
    },
  });
});

// Bulk update users (admin only)
export const bulkUpdateUsers = asyncHandler(async (req, res) => {
  const { userIds, ...updateData } = req.body;

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "User IDs array is required",
    });
  }

  const result = await userService.bulkUpdateUsers(userIds, updateData);

  res.status(200).json({
    success: true,
    message: result.message,
    data: {
      modifiedCount: result.modifiedCount,
    },
  });
});

// Get users by role (admin/agent)
export const getUsersByRole = asyncHandler(async (req, res) => {
  const { role } = req.params;

  const queryParams = {
    ...req.query,
    role,
  };

  const result = await userService.getAllUsers(queryParams);

  res.status(200).json({
    success: true,
    message: `${
      role.charAt(0).toUpperCase() + role.slice(1)
    }s retrieved successfully`,
    data: result,
  });
});

// Toggle user status (admin only)
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  const updatedUser = await userService.updateUserByAdmin(
    req.params.id,
    { isActive: !user.isActive },
    req.user._id
  );

  res.status(200).json({
    success: true,
    message: `User ${
      updatedUser.isActive ? "activated" : "deactivated"
    } successfully`,
    data: {
      user: updatedUser,
    },
  });
});
