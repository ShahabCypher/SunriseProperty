import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";

const router = express.Router();

// Authentication routes
router.use("/auth", authRoutes);

// User management routes
router.use("/users", userRoutes);

export default router;
