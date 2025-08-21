import express from "express";
import userRoutes from "./users/index.js";

const router = express.Router();

router.use("/", userRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;
