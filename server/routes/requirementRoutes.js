const express = require("express");

const {
  createRequirement,
  getRequirements,
  getMyRequirements,
  deleteRequirement
} = require("../controllers/requirementController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all open requirements
router.get("/", protect, getRequirements);

// Create requirement
router.post("/", protect, createRequirement);

// Get buyer's requirements
router.get("/my-requirements", protect, getMyRequirements);

// Delete requirement
router.delete("/:id", protect, deleteRequirement);

module.exports = router;