const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  getMyProducts,
  deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// GET ALL PRODUCTS
router.get(
  "/",
  protect,
  getProducts
);

// GET MY PRODUCTS
// Must be BEFORE /:id
router.get(
  "/my",
  protect,
  getMyProducts
);

// ADD PRODUCT + IMAGE
router.post(
  "/",
  protect,
  upload.single("image"),
  addProduct
);

// GET SINGLE PRODUCT
router.get(
  "/:id",
  protect,
  getProductById
);

// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  deleteProduct
);

module.exports = router;