const Product = require("../models/Product");


// ==========================================
// ADD PRODUCT
// ==========================================

const addProduct = async (req, res) => {

  try {

    // Only farmers can add products
    if (req.user.role !== "farmer") {

      return res.status(403).json({
        success: false,
        message: "Only farmers can add products"
      });

    }


    // ======================================
    // REQUEST BODY
    // ======================================

    const {
      name,
      category,
      quantity,
      unit,
      price,
      quality,
      harvestDate,
      location,
      description
    } = req.body || {};


    // ======================================
    // VALIDATION
    // ======================================

    if (
      !name ||
      !category ||
      !quantity ||
      !price ||
      !location
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });

    }


    // ======================================
    // IMAGE
    // ======================================

    let image = "";

    if (req.file) {

      image = `/uploads/${req.file.filename}`;

    }


    // ======================================
    // CREATE PRODUCT
    // ======================================

    const product = await Product.create({

      farmerId: req.user.id,

      name: name.trim(),

      category: category.trim(),

      quantity: Number(quantity),

      unit: unit || "kg",

      price: Number(price),

      quality: quality || "Grade A",

      harvestDate:
        harvestDate || undefined,

      location: location.trim(),

      description:
        description
          ? description.trim()
          : "",

      image,

      status: "available"

    });


    // ======================================
    // RESPONSE
    // ======================================

    return res.status(201).json({

      success: true,

      message:
        "Product added successfully 🌾",

      product

    });

  } catch (error) {

    console.error(
      "Add Product Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

};



// ==========================================
// GET ALL PRODUCTS
// ==========================================

const getProducts = async (req, res) => {

  try {

    const {
      search,
      category,
      location,
      quality,
      minPrice,
      maxPrice
    } = req.query;


    const filter = {
      status: "available"
    };


    // SEARCH
    if (search) {

      filter.name = {
        $regex: search,
        $options: "i"
      };

    }


    // CATEGORY
    if (category) {

      filter.category = {
        $regex: category,
        $options: "i"
      };

    }


    // LOCATION
    if (location) {

      filter.location = {
        $regex: location,
        $options: "i"
      };

    }


    // QUALITY
    if (quality) {

      filter.quality = quality;

    }


    // PRICE
    if (minPrice || maxPrice) {

      filter.price = {};

      if (minPrice) {

        filter.price.$gte =
          Number(minPrice);

      }

      if (maxPrice) {

        filter.price.$lte =
          Number(maxPrice);

      }

    }


    const products =
      await Product.find(filter)

        .populate(
          "farmerId",
          "name email phone location"
        )

        .sort({
          createdAt: -1
        });


    return res.status(200).json({

      success: true,

      count: products.length,

      products

    });

  } catch (error) {

    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

};



// ==========================================
// GET SINGLE PRODUCT
// ==========================================

const getProductById = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      )

        .populate(
          "farmerId",
          "name email phone location"
        );


    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found"

      });

    }


    return res.status(200).json({

      success: true,

      product

    });

  } catch (error) {

    console.error(
      "Get Product By ID Error:",
      error
    );


    // Invalid MongoDB ID
    if (
      error.name === "CastError"
    ) {

      return res.status(400).json({

        success: false,

        message: "Invalid product ID"

      });

    }


    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

};



// ==========================================
// GET MY PRODUCTS
// ==========================================

const getMyProducts = async (req, res) => {

  try {

    if (req.user.role !== "farmer") {

      return res.status(403).json({

        success: false,

        message:
          "Only farmers can view their products"

      });

    }


    const products =
      await Product.find({

        farmerId: req.user.id

      })

        .sort({
          createdAt: -1
        });


    return res.status(200).json({

      success: true,

      count: products.length,

      products

    });

  } catch (error) {

    console.error(
      "Get My Products Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

};



// ==========================================
// DELETE PRODUCT
// ==========================================

const deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found"

      });

    }


    // Check ownership
    if (
      product.farmerId.toString() !==
      req.user.id.toString()
    ) {

      return res.status(403).json({

        success: false,

        message:
          "You can only delete your own products"

      });

    }


    await product.deleteOne();


    return res.status(200).json({

      success: true,

      message:
        "Product deleted successfully"

    });

  } catch (error) {

    console.error(
      "Delete Product Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

};



// ==========================================
// EXPORT
// ==========================================

module.exports = {

  addProduct,

  getProducts,

  getProductById,

  getMyProducts,

  deleteProduct

};