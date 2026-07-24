import express from "express";
import userRoutes from "./users/index.js";
import propertyRoutes from "./properties/index.js";

const router = express.Router();

router.use("/", userRoutes);
router.use("/properties", propertyRoutes);

export default router;
