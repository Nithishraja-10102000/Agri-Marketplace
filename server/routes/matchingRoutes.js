const express = require("express");

const {
  findMatches
} = require("../controllers/matchingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Find matching farmers/products
router.get(
  "/:requirementId",
  protect,
  findMatches
);

module.exports = router;