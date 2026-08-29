const Enquiry = require("../models/Enquiry");
const Product = require("../models/Product");

// Create enquiry
const createEnquiry = async (req, res) => {
  try {
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        success: false,
        message: "Only buyers can send enquiries"
      });
    }

    const {
      productId,
      quantity,
      offerPrice,
      message
    } = req.body;

    if (!productId || !quantity || !offerPrice) {
      return res.status(400).json({
        success: false,
        message:
          "Product, quantity and offer price are required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (product.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Product is not available"
      });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity is not available"
      });
    }

    const enquiry = await Enquiry.create({
      buyerId: req.user.id,
      farmerId: product.farmerId,
      productId: product._id,
      quantity,
      offerPrice,
      message
    });

    const populatedEnquiry =
      await Enquiry.findById(enquiry._id)
        .populate("buyerId", "name email phone location")
        .populate("farmerId", "name email phone location")
        .populate("productId", "name category unit price");

    res.status(201).json({
      success: true,
      message: "Enquiry sent successfully",
      enquiry: populatedEnquiry
    });

  } catch (error) {
    console.error("Create Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// Buyer enquiries
const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      buyerId: req.user.id
    })
      .populate(
        "farmerId",
        "name email phone location"
      )
      .populate(
        "productId",
        "name category quantity unit price quality"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });

  } catch (error) {
    console.error("Get Buyer Enquiries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Farmer enquiries
const getFarmerEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      farmerId: req.user.id
    })
      .populate(
        "buyerId",
        "name email phone location"
      )
      .populate(
        "productId",
        "name category quantity unit price quality"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });

  } catch (error) {
    console.error("Get Farmer Enquiries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// Farmer accepts/rejects enquiry
const updateEnquiryStatus = async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        success: false,
        message: "Only farmers can update enquiries"
      });
    }

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status"
      });
    }

    const enquiry = await Enquiry.findById(
      req.params.id
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    if (
      enquiry.farmerId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only update your own enquiries"
      });
    }

    enquiry.status = status;

    await enquiry.save();

    res.status(200).json({
      success: true,
      message:
        `Enquiry ${status} successfully`,
      enquiry
    });

  } catch (error) {
    console.error("Update Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  createEnquiry,
  getMyEnquiries,
  getFarmerEnquiries,
  updateEnquiryStatus
};