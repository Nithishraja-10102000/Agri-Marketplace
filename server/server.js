const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const requirementRoutes = require("./routes/requirementRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

dotenv.config();

const app = express();

connectDB();

// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// UPLOADS
// ==============================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ==============================
// ROUTES
// ==============================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/requirements",
  requirementRoutes
);

app.use(
  "/api/matching",
  matchingRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

// ==============================
// ROOT
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Agri Marketplace API is running 🌾"
  });
});

// ==============================
// 404
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ==============================
// ERROR HANDLER
// ==============================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Server error"
  });
});

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});