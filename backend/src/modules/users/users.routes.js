import express from "express";
import * as userController from "./users.controller.js";
import {
  authenticateToken,
  authorize,
} from "../../middleware/authMiddleware.js";
import { limiter } from "../../middleware/security.js";
import {
  validateUserUpdate,
  validateObjectId,
  validateQueryParams,
} from "../../middleware/validation.js";

const router = express.Router();

// Apply rate limiting to all routes
router.use(limiter);

// All routes require authentication
router.use(authenticateToken);

// User profile routes (accessible by authenticated users)
router.get("/profile", userController.getProfile);
router.put("/profile", validateUserUpdate, userController.updateProfile);

// Search users (accessible by all authenticated users)
router.get("/search", validateQueryParams, userController.searchUsers);

// Admin and Agent only routes
router.use(authorize("admin", "agent"));

// Get users by role
router.get("/role/:role", validateQueryParams, userController.getUsersByRole);

// Admin only routes
router.use(authorize("admin"));

// User management routes
router.get("/", validateQueryParams, userController.getAllUsers);
router.get("/stats", userController.getUserStats);
router.get("/:id", validateObjectId("id"), userController.getUserById);
router.put(
  "/:id",
  validateObjectId("id"),
  validateUserUpdate,
  userController.updateUser
);
router.delete("/:id", validateObjectId("id"), userController.deleteUser);
router.patch(
  "/:id/reactivate",
  validateObjectId("id"),
  userController.reactivateUser
);
router.patch(
  "/:id/toggle-status",
  validateObjectId("id"),
  userController.toggleUserStatus
);

// Bulk operations
router.patch("/bulk/update", userController.bulkUpdateUsers);

// Super admin only (permanent delete)
router.delete(
  "/:id/permanent",
  validateObjectId("id"),
  authorize("admin"), // You might want to add a super admin check here
  userController.permanentlyDeleteUser
);

export default router;
