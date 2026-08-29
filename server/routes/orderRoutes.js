const express = require("express");

const {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Buyer places order
router.post("/", protect, createOrder);

// Buyer views orders
router.get("/buyer", protect, getBuyerOrders);

// Farmer views orders
router.get("/farmer", protect, getFarmerOrders);

// Update order status
router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;