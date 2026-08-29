const express = require("express");

const {
  createEnquiry,
  getMyEnquiries,
  getFarmerEnquiries,
  updateEnquiryStatus
} = require("../controllers/enquiryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createEnquiry
);

router.get(
  "/buyer",
  protect,
  getMyEnquiries
);

router.get(
  "/farmer",
  protect,
  getFarmerEnquiries
);

router.put(
  "/:id/status",
  protect,
  updateEnquiryStatus
);

module.exports = router;