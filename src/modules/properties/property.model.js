import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
      minlength: [3, "Property name must be at least 3 characters long"],
      maxlength: [100, "Property name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    location: {
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      coordinates: {
        latitude: {
          type: Number,
          required: [true, "Latitude is required"],
          min: [-90, "Latitude must be between -90 and 90"],
          max: [90, "Latitude must be between -90 and 90"],
        },
        longitude: {
          type: Number,
          required: [true, "Longitude is required"],
          min: [-180, "Longitude must be between -180 and 180"],
          max: [180, "Longitude must be between -180 and 180"],
        },
      },
    },
    price: {
      amount: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
      },
      currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "USD",
        uppercase: true,
        enum: [
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
        ],
      },
    },
    details: {
      bedrooms: {
        type: Number,
        required: [true, "Number of bedrooms is required"],
        min: [0, "Bedrooms cannot be negative"],
        max: [50, "Bedrooms cannot exceed 50"],
      },
      bathrooms: {
        type: Number,
        required: [true, "Number of bathrooms is required"],
        min: [0, "Bathrooms cannot be negative"],
        max: [50, "Bathrooms cannot exceed 50"],
        set: (v) => Math.round(v * 2) / 2, // Allow half bathrooms
      },
      area: {
        value: {
          type: Number,
          required: [true, "Area value is required"],
          min: [1, "Area must be at least 1"],
        },
        unit: {
          type: String,
          required: [true, "Area unit is required"],
          enum: ["sqm", "sqft"],
          default: "sqm",
        },
      },
      buildYear: {
        type: Number,
        required: [true, "Build year is required"],
        min: [1800, "Build year must be after 1800"],
        max: [
          new Date().getFullYear() + 2,
          "Build year cannot be more than 2 years in the future",
        ],
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
        originalName: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["available", "sold", "rented", "pending", "off-market"],
      default: "available",
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "house",
        "apartment",
        "condo",
        "townhouse",
        "villa",
        "studio",
        "commercial",
        "land",
      ],
      required: [true, "Property type is required"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Property owner is required"],
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    listedAt: {
      type: Date,
      default: Date.now,
    },
    soldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for performance
propertySchema.index({ "location.country": 1, "location.city": 1 });
propertySchema.index({
  "location.coordinates.latitude": 1,
  "location.coordinates.longitude": 1,
});
propertySchema.index({ status: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ "price.amount": 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ agent: 1 });
propertySchema.index({ isFeatured: 1, isActive: 1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ views: -1 });

// Geospatial index for location-based queries
propertySchema.index({ "location.coordinates": "2dsphere" });

// Text index for search functionality
propertySchema.index({
  name: "text",
  description: "text",
  "location.address": "text",
  "location.city": "text",
  features: "text",
});

// Virtual for area conversion
propertySchema.virtual("areaInSqft").get(function () {
  if (this.details.area.unit === "sqm") {
    return Math.round(this.details.area.value * 10.764);
  }
  return this.details.area.value;
});

propertySchema.virtual("areaInSqm").get(function () {
  if (this.details.area.unit === "sqft") {
    return Math.round(this.details.area.value / 10.764);
  }
  return this.details.area.value;
});

// Method to increment views
propertySchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Method to set primary image
propertySchema.methods.setPrimaryImage = function (imageId) {
  // Reset all images to not primary
  this.images.forEach((img) => {
    img.isPrimary = false;
  });

  // Set the specified image as primary
  const image = this.images.id(imageId);
  if (image) {
    image.isPrimary = true;
  }

  return this.save();
};

// Method to get primary image
propertySchema.methods.getPrimaryImage = function () {
  return this.images.find((img) => img.isPrimary) || this.images[0] || null;
};

// Static method to find properties within radius
propertySchema.statics.findNearby = function (
  latitude,
  longitude,
  maxDistance = 10000
) {
  return this.find({
    "location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance, // in meters
      },
    },
    isActive: true,
  });
};

// Pre-save middleware to ensure only one primary image
propertySchema.pre("save", function (next) {
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter((img) => img.isPrimary);

    if (primaryImages.length === 0) {
      // Set first image as primary if none is set
      this.images[0].isPrimary = true;
    } else if (primaryImages.length > 1) {
      // Ensure only one primary image
      this.images.forEach((img, index) => {
        img.isPrimary = index === 0;
      });
    }
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
