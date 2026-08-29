const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
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

    pricePerUnit: {
      type: Number,
      required: true,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryDate: {
      type: Date,
      required: true
    },

    deliveryLocation: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);