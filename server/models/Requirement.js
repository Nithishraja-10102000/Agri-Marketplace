const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productName: {
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

    quality: {
      type: String,
      enum: ["A", "B", "C"],
      default: "A"
    },

    expectedPrice: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryDate: {
      type: Date,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["open", "matched", "closed"],
      default: "open"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Requirement", requirementSchema);