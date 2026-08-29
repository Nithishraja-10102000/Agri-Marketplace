const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
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

    offerPrice: {
      type: Number,
      required: true,
      min: 0
    },

    message: {
      type: String,
      trim: true,
      default: ""
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Enquiry",
  enquirySchema
);