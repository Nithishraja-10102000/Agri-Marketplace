const Product = require("../models/Product");
const Requirement = require("../models/Requirement");

// ==========================================
// FIND MATCHING PRODUCTS
// ==========================================
const findMatches = async (req, res) => {
  try {
    const requirementId = req.params.requirementId;

    // Find requirement
    const requirement = await Requirement.findById(requirementId);

    if (!requirement) {
      return res.status(404).json({
        message: "Requirement not found"
      });
    }

    // Only the buyer who created the requirement can find matches
    if (requirement.buyerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only find matches for your own requirement"
      });
    }

    // Find available products
    const products = await Product.find({
      status: "available"
    }).populate("farmerId", "name phone location");

    const matches = [];

    for (const product of products) {
      let score = 0;

      // ======================================
      // 1. PRODUCT NAME MATCH - 35 POINTS
      // ======================================
      const productName = product.name.toLowerCase();
      const requiredName = requirement.productName.toLowerCase();

      if (productName === requiredName) {
        score += 35;
      } else if (
        productName.includes(requiredName) ||
        requiredName.includes(productName)
      ) {
        score += 20;
      }

      // ======================================
      // 2. LOCATION MATCH - 25 POINTS
      // ======================================
      if (
        product.location.toLowerCase() ===
        requirement.location.toLowerCase()
      ) {
        score += 25;
      } else if (
        product.location
          .toLowerCase()
          .includes(requirement.location.toLowerCase()) ||
        requirement.location
          .toLowerCase()
          .includes(product.location.toLowerCase())
      ) {
        score += 15;
      }

      // ======================================
      // 3. QUALITY MATCH - 15 POINTS
      // ======================================
      if (product.quality === requirement.quality) {
        score += 15;
      }

      // ======================================
      // 4. PRICE SUITABILITY - 15 POINTS
      // ======================================
      if (product.price <= requirement.expectedPrice) {
        score += 15;
      } else if (
        product.price <= requirement.expectedPrice * 1.1
      ) {
        score += 8;
      }

      // ======================================
      // 5. QUANTITY AVAILABILITY - 10 POINTS
      // ======================================
      if (product.quantity >= requirement.quantity) {
        score += 10;
      } else if (product.quantity >= requirement.quantity * 0.5) {
        score += 5;
      }

      // Only return products with a meaningful match
      if (score >= 30) {
        matches.push({
          product,
          matchScore: score
        });
      }
    }

    // Highest score first
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      requirement: {
        id: requirement._id,
        productName: requirement.productName,
        quantity: requirement.quantity,
        unit: requirement.unit,
        quality: requirement.quality,
        expectedPrice: requirement.expectedPrice,
        location: requirement.location
      },
      count: matches.length,
      matches
    });

  } catch (error) {
    console.error("Matching Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  findMatches
};