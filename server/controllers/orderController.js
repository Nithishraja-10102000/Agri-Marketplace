const Order = require("../models/Order");
const Product = require("../models/Product");

// ==========================================
// CREATE ORDER
// ==========================================
const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        message: "Only buyers can place orders"
      });
    }

    const {
      productId,
      quantity,
      deliveryDate,
      deliveryLocation
    } = req.body;

    if (
      !productId ||
      !quantity ||
      !deliveryDate ||
      !deliveryLocation
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.status !== "available") {
      return res.status(400).json({
        message: "Product is not available"
      });
    }

    // Check quantity
    if (quantity > product.quantity) {
      return res.status(400).json({
        message: `Only ${product.quantity} ${product.unit} available`
      });
    }

    // Calculate total
    const totalAmount = quantity * product.price;

    const order = await Order.create({
      buyerId: req.user.id,
      farmerId: product.farmerId,
      productId: product._id,
      quantity,
      unit: product.unit,
      pricePerUnit: product.price,
      totalAmount,
      deliveryDate,
      deliveryLocation
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// BUYER ORDERS
// ==========================================
const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyerId: req.user.id
    })
      .populate("productId", "name category price")
      .populate("farmerId", "name phone location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Get Buyer Orders Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// FARMER ORDERS
// ==========================================
const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      farmerId: req.user.id
    })
      .populate("productId", "name category price")
      .populate("buyerId", "name phone location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Get Farmer Orders Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE ORDER STATUS
// ==========================================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "accepted",
      "rejected",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Only farmer or buyer involved in order can update it
    const isBuyer =
      order.buyerId.toString() === req.user.id;

    const isFarmer =
      order.farmerId.toString() === req.user.id;

    if (!isBuyer && !isFarmer) {
      return res.status(403).json({
        message: "You are not authorized"
      });
    }

    // Farmer can accept/reject/process/ship
    if (isFarmer) {
      const farmerStatuses = [
        "accepted",
        "rejected",
        "processing",
        "shipped"
      ];

      if (!farmerStatuses.includes(status)) {
        return res.status(403).json({
          message: "Farmer cannot set this status"
        });
      }
    }

    // Buyer can cancel or confirm delivery
    if (isBuyer) {
      if (!["cancelled", "delivered"].includes(status)) {
        return res.status(403).json({
          message: "Buyer cannot set this status"
        });
      }
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order
    });

  } catch (error) {
    console.error("Update Order Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus
};