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
