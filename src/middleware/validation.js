import { body, param, query, validationResult } from "express-validator";

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  body("role")
    .optional()
    .isIn(["user", "agent", "admin"])
    .withMessage("Invalid role specified"),

  handleValidationErrors,
];

// User login validation
export const validateUserLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

// User update validation
export const validateUserUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("role")
    .optional()
    .isIn(["user", "agent", "admin"])
    .withMessage("Invalid role specified"),

  handleValidationErrors,
];

// Password change validation
export const validatePasswordChange = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "New password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match");
    }
    return true;
  }),

  handleValidationErrors,
];

// Property creation validation
export const validatePropertyCreation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Property name must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("location.country").trim().notEmpty().withMessage("Country is required"),

  body("location.city").trim().notEmpty().withMessage("City is required"),

  body("location.address").trim().notEmpty().withMessage("Address is required"),

  body("location.coordinates.latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  body("location.coordinates.longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),

  body("price.amount")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("price.currency")
    .optional()
    .isIn([
      "USD",
      "EUR",
      "GBP",
      "CAD",
      "AUD",
      "JPY",
      "CHF",
      "SEK",
      "NOK",
      "DKK",
    ])
    .withMessage("Invalid currency"),

  body("details.bedrooms")
    .isInt({ min: 0, max: 50 })
    .withMessage("Bedrooms must be between 0 and 50"),

  body("details.bathrooms")
    .isFloat({ min: 0, max: 50 })
    .withMessage("Bathrooms must be between 0 and 50"),

  body("details.area.value")
    .isFloat({ min: 1 })
    .withMessage("Area must be at least 1"),

  body("details.area.unit")
    .isIn(["sqm", "sqft"])
    .withMessage("Area unit must be either 'sqm' or 'sqft'"),

  body("details.buildYear")
    .isInt({ min: 1800, max: new Date().getFullYear() + 2 })
    .withMessage(
      `Build year must be between 1800 and ${new Date().getFullYear() + 2}`
    ),

  body("propertyType")
    .isIn([
      "house",
      "apartment",
      "condo",
      "townhouse",
      "villa",
      "studio",
      "commercial",
      "land",
    ])
    .withMessage("Invalid property type"),

  body("status")
    .optional()
    .isIn(["available", "sold", "rented", "pending", "off-market"])
    .withMessage("Invalid status"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("features.*")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Each feature must be between 1 and 50 characters"),

  body("agent").optional().isMongoId().withMessage("Invalid agent ID"),

  handleValidationErrors,
];

// Property update validation
export const validatePropertyUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Property name must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("location.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty"),

  body("location.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty"),

  body("location.address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),

  body("location.coordinates.latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  body("location.coordinates.longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),

  body("price.amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("price.currency")
    .optional()
    .isIn([
      "USD",
      "EUR",
      "GBP",
      "CAD",
      "AUD",
      "JPY",
      "CHF",
      "SEK",
      "NOK",
      "DKK",
    ])
    .withMessage("Invalid currency"),

  body("details.bedrooms")
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage("Bedrooms must be between 0 and 50"),

  body("details.bathrooms")
    .optional()
    .isFloat({ min: 0, max: 50 })
    .withMessage("Bathrooms must be between 0 and 50"),

  body("details.area.value")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Area must be at least 1"),

  body("details.area.unit")
    .optional()
    .isIn(["sqm", "sqft"])
    .withMessage("Area unit must be either 'sqm' or 'sqft'"),

  body("details.buildYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 2 })
    .withMessage(
      `Build year must be between 1800 and ${new Date().getFullYear() + 2}`
    ),

  body("propertyType")
    .optional()
    .isIn([
      "house",
      "apartment",
      "condo",
      "townhouse",
      "villa",
      "studio",
      "commercial",
      "land",
    ])
    .withMessage("Invalid property type"),

  body("status")
    .optional()
    .isIn(["available", "sold", "rented", "pending", "off-market"])
    .withMessage("Invalid status"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("features.*")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Each feature must be between 1 and 50 characters"),

  body("agent").optional().isMongoId().withMessage("Invalid agent ID"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  handleValidationErrors,
];

// Property status update validation
export const validatePropertyStatusUpdate = [
  body("status")
    .isIn(["available", "sold", "rented", "pending", "off-market"])
    .withMessage("Invalid status"),

  handleValidationErrors,
];

// Property search query validation
export const validatePropertyQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search term must be between 1 and 100 characters"),

  query("country")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Country must be between 1 and 50 characters"),

  query("city")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("City must be between 1 and 50 characters"),

  query("propertyType")
    .optional()
    .isIn([
      "house",
      "apartment",
      "condo",
      "townhouse",
      "villa",
      "studio",
      "commercial",
      "land",
    ])
    .withMessage("Invalid property type"),

  query("status")
    .optional()
    .isIn(["available", "sold", "rented", "pending", "off-market", "all"])
    .withMessage("Invalid status"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a positive number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a positive number"),

  query("bedrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a non-negative integer"),

  query("bathrooms")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Bathrooms must be a non-negative number"),

  query("minArea")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum area must be a positive number"),

  query("maxArea")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum area must be a positive number"),

  query("buildYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() + 2 })
    .withMessage(
      `Build year must be between 1800 and ${new Date().getFullYear() + 2}`
    ),

  query("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  query("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),

  query("radius")
    .optional()
    .isInt({ min: 100, max: 100000 })
    .withMessage("Radius must be between 100 and 100000 meters"),

  query("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  query("sortBy")
    .optional()
    .isIn([
      "createdAt",
      "price.amount",
      "views",
      "details.area.value",
      "details.buildYear",
    ])
    .withMessage("Invalid sort field"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be 'asc' or 'desc'"),

  handleValidationErrors,
];

// MongoDB ObjectId validation
export const validateObjectId = (paramName) => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName} format`),

  handleValidationErrors,
];

// Query parameters validation
export const validateQueryParams = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search term must be between 1 and 100 characters"),

  query("role")
    .optional()
    .isIn(["user", "agent", "admin"])
    .withMessage("Invalid role filter"),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),

  handleValidationErrors,
];

// Token validation
export const validateRefreshToken = [
  body("refreshToken").notEmpty().withMessage("Refresh token is required"),

  handleValidationErrors,
];
