const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    unit: {
      type: String,
      enum: ["kg", "ton", "quintal", "box"],
      default: "kg"
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quality: {
      type: String,
      enum: ["Grade A", "Grade B", "Grade C"],
      default: "Grade A"
    },

    harvestDate: {
      type: Date
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    // Farmer uploaded product image
    image: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["available", "sold", "inactive"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);