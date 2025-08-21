import User from "./users.model.js";
import { AppError } from "../../middleware/errorHandler.js";

// Get all users with filtering, pagination, and search
export const getAllUsers = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search,
    role,
    isActive,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = queryParams;

  // Build filter object
  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  // Build search query
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  try {
    // Execute query with aggregation for better performance
    const [users, totalCount] = await Promise.all([
      User.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select("-refreshTokens -passwordResetToken"),
      User.countDocuments(filter),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    return {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        limit: parseInt(limit),
        hasNextPage,
        hasPrevPage,
      },
    };
  } catch (error) {
    throw new AppError("Error fetching users", 500);
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select(
    "-refreshTokens -passwordResetToken"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Get user profile (current user)
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select(
    "-refreshTokens -passwordResetToken"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Update user profile
export const updateUserProfile = async (userId, updateData) => {
  const { name } = updateData;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Update only allowed fields
  if (name !== undefined) user.name = name;

  await user.save();

  return user;
};

// Update user by admin
export const updateUserByAdmin = async (userId, updateData, adminId) => {
  const { name, email, role, isActive } = updateData;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Prevent admin from deactivating themselves
  if (userId === adminId && isActive === false) {
    throw new AppError("Cannot deactivate your own account", 400);
  }

  // Check if email already exists (if being updated)
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }
    user.email = email;
  }

  // Update fields
  if (name !== undefined) user.name = name;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  return user;
};

// Delete user (soft delete by deactivating)
export const deleteUser = async (userId, adminId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Prevent admin from deleting themselves
  if (userId === adminId) {
    throw new AppError("Cannot delete your own account", 400);
  }

  user.isActive = false;
  await user.save();

  // Clear all refresh tokens
  await user.clearRefreshTokens();

  return { message: "User deleted successfully" };
};

// Permanently delete user (only for super admin)
export const permanentlyDeleteUser = async (userId, adminId) => {
  if (userId === adminId) {
    throw new AppError("Cannot delete your own account", 400);
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return { message: "User permanently deleted" };
};

// Reactivate user
export const reactivateUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.isActive = true;
  await user.save();

  return user;
};

// Get user statistics
export const getUserStats = async () => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          inactiveUsers: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
          },
        },
      },
    ]);

    const roleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlySignups = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 11,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    return {
      overview: stats[0] || {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
      },
      roleDistribution: roleStats,
      monthlySignups,
    };
  } catch (error) {
    throw new AppError("Error fetching user statistics", 500);
  }
};

// Search users by multiple criteria
export const searchUsers = async (searchTerm, filters = {}) => {
  const { role, isActive, limit = 20 } = filters;

  const filter = {
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
    ],
  };

  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive;

  const users = await User.find(filter)
    .limit(parseInt(limit))
    .select("name email role isActive createdAt")
    .sort({ name: 1 });

  return users;
};

// Bulk update users
export const bulkUpdateUsers = async (userIds, updateData) => {
  const { role, isActive } = updateData;

  const updateFields = {};
  if (role !== undefined) updateFields.role = role;
  if (isActive !== undefined) updateFields.isActive = isActive;

  if (Object.keys(updateFields).length === 0) {
    throw new AppError("No valid update fields provided", 400);
  }

  const result = await User.updateMany({ _id: { $in: userIds } }, updateFields);

  return {
    message: `${result.modifiedCount} users updated successfully`,
    modifiedCount: result.modifiedCount,
  };
};
