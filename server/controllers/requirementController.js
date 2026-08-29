const Requirement = require("../models/Requirement");

// ==========================================
// CREATE REQUIREMENT
// ==========================================
const createRequirement = async (req, res) => {
  try {
    // Only buyers can create requirements
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        message: "Only buyers can create requirements"
      });
    }

    const {
      productName,
      category,
      quantity,
      unit,
      quality,
      expectedPrice,
      deliveryDate,
      location,
      description
    } = req.body;

    if (
      !productName ||
      !category ||
      !quantity ||
      !expectedPrice ||
      !deliveryDate ||
      !location
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const requirement = await Requirement.create({
      buyerId: req.user.id,
      productName,
      category,
      quantity,
      unit,
      quality,
      expectedPrice,
      deliveryDate,
      location,
      description
    });

    res.status(201).json({
      message: "Requirement created successfully",
      requirement
    });

  } catch (error) {
    console.error("Create Requirement Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL OPEN REQUIREMENTS
// ==========================================
const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({
      status: "open"
    })
      .populate("buyerId", "name phone location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requirements.length,
      requirements
    });

  } catch (error) {
    console.error("Get Requirements Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// GET MY REQUIREMENTS
// ==========================================
const getMyRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({
      buyerId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: requirements.length,
      requirements
    });

  } catch (error) {
    console.error("Get My Requirements Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ==========================================
// DELETE REQUIREMENT
// ==========================================
const deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({
        message: "Requirement not found"
      });
    }

    if (requirement.buyerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own requirements"
      });
    }

    await requirement.deleteOne();

    res.status(200).json({
      message: "Requirement deleted successfully"
    });

  } catch (error) {
    console.error("Delete Requirement Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  createRequirement,
  getRequirements,
  getMyRequirements,
  deleteRequirement
};