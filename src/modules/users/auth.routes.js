import express from "express";
import * as authController from "./auth.controller.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import { authLimiter } from "../../middleware/security.js";
import {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordChange,
  validateRefreshToken,
} from "../../middleware/validation.js";

const router = express.Router();

// Public routes
router.post(
  "/register",
  authLimiter,
  validateUserRegistration,
  authController.register
);
router.post("/login", authLimiter, validateUserLogin, authController.login);
router.post(
  "/refresh-token",
  validateRefreshToken,
  authController.refreshToken
);

// Protected routes (require authentication)
router.use(authenticateToken);

router.get("/me", authController.getMe);
router.get("/check", authController.checkAuth);
router.post("/logout", authController.logout);
router.post("/logout-all", authController.logoutAll);
router.post(
  "/change-password",
  validatePasswordChange,
  authController.changePassword
);

export default router;
