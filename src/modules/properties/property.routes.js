import express from "express";
import * as propertyController from "./property.controller.js";
import {
  authenticateToken,
  authorize,
} from "../../middleware/authMiddleware.js";
import { limiter } from "../../middleware/security.js";
import {
  validatePropertyCreation,
  validatePropertyUpdate,
  validatePropertyStatusUpdate,
  validatePropertyQuery,
  validateObjectId,
  preprocessPropertyData,
} from "../../middleware/validation.js";
import { uploadMultiple, handleUploadError } from "../../middleware/upload.js";

const router = express.Router();

// Apply rate limiting to all routes
router.use(limiter);

// Public routes (no authentication required)
router.get("/", validatePropertyQuery, propertyController.getAllProperties);
router.get(
  "/search",
  validatePropertyQuery,
  propertyController.searchProperties
);
router.get(
  "/featured",
  validatePropertyQuery,
  propertyController.getFeaturedProperties
);
router.get(
  "/nearby",
  validatePropertyQuery,
  propertyController.getNearbyProperties
);
router.get(
  "/type/:type",
  validatePropertyQuery,
  propertyController.getPropertiesByType
);
router.get(
  "/status/:status",
  validatePropertyQuery,
  propertyController.getPropertiesByStatus
);
router.get(
  "/location/:country/:city",
  validatePropertyQuery,
  propertyController.getPropertiesByLocation
);
router.get("/:id", validateObjectId("id"), propertyController.getPropertyById);

// Protected routes (authentication required)
router.use(authenticateToken);

// User routes (authenticated users)
router.get(
  "/owner/my-properties",
  validatePropertyQuery,
  propertyController.getMyProperties
);

// Property creation with image upload
router.post(
  "/",
  uploadMultiple,
  handleUploadError,
  preprocessPropertyData,
  validatePropertyCreation,
  propertyController.createProperty
);

// Property management routes (owner/agent/admin)
router.put(
  "/:id",
  validateObjectId("id"),
  preprocessPropertyData,
  validatePropertyUpdate,
  propertyController.updateProperty
);

router.patch(
  "/:id/status",
  validateObjectId("id"),
  validatePropertyStatusUpdate,
  propertyController.updatePropertyStatus
);

router.delete(
  "/:id",
  validateObjectId("id"),
  propertyController.deleteProperty
);

// Image management routes
router.post(
  "/:id/images",
  validateObjectId("id"),
  uploadMultiple,
  handleUploadError,
  preprocessPropertyData,
  propertyController.addPropertyImages
);

router.delete(
  "/:id/images/:imageId",
  validateObjectId("id"),
  validateObjectId("imageId"),
  propertyController.removePropertyImage
);

router.patch(
  "/:id/images/:imageId/primary",
  validateObjectId("id"),
  validateObjectId("imageId"),
  propertyController.setPrimaryImage
);

// Admin and Agent routes
router.use(authorize("admin", "agent"));

// Property statistics
router.get("/admin/stats", propertyController.getPropertyStats);

// Get properties by owner (admin/agent can view any owner's properties)
router.get(
  "/owner/:ownerId",
  validateObjectId("ownerId"),
  validatePropertyQuery,
  propertyController.getPropertiesByOwner
);

// Admin only routes
router.use(authorize("admin"));

// Featured property management
router.patch(
  "/:id/toggle-featured",
  validateObjectId("id"),
  propertyController.toggleFeaturedStatus
);

// Bulk operations
router.patch("/bulk/update", propertyController.bulkUpdateProperties);

// Permanent deletion
router.delete(
  "/:id/permanent",
  validateObjectId("id"),
  propertyController.permanentlyDeleteProperty
);

export default router;
