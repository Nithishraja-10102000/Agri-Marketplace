import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// ================= PUBLIC PAGES =================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ================= FARMER PAGES =================

import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import FarmerEnquiries from "./pages/FarmerEnquiries";

// ================= BUYER PAGES =================

import BuyerDashboard from "./pages/BuyerDashboard";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import BuyerEnquiries from "./pages/BuyerEnquiries";
import BuyerEnquiry from "./pages/BuyerEnquiry";

// ================= PROTECTED ROUTE =================

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================================================
            FARMER ROUTES
        ================================================== */}

        {/* Farmer Dashboard */}
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute role="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add Product */}
        <Route
          path="/farmer/add-product"
          element={
            <ProtectedRoute role="farmer">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        {/* My Products */}
        <Route
          path="/farmer/my-products"
          element={
            <ProtectedRoute role="farmer">
              <MyProducts />
            </ProtectedRoute>
          }
        />

        {/* Farmer Enquiries */}
        <Route
          path="/farmer/enquiries"
          element={
            <ProtectedRoute role="farmer">
              <FarmerEnquiries />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            BUYER ROUTES
        ================================================== */}

        {/* Buyer Dashboard */}
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Marketplace */}
        <Route
          path="/buyer/marketplace"
          element={
            <ProtectedRoute role="buyer">
              <Marketplace />
            </ProtectedRoute>
          }
        />

        {/* Buyer Enquiries */}
        <Route
          path="/buyer/enquiries"
          element={
            <ProtectedRoute role="buyer">
              <BuyerEnquiries />
            </ProtectedRoute>
          }
        />

        {/* Product Details */}
        <Route
          path="/buyer/product/:id"
          element={
            <ProtectedRoute role="buyer">
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* Send Enquiry */}
        <Route
          path="/buyer/enquire/:id"
          element={
            <ProtectedRoute role="buyer">
              <BuyerEnquiry />
            </ProtectedRoute>
          }
        />


        {/* ==================================================
            404
        ================================================== */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px"
              }}
            >
              <div>

                <div
                  style={{
                    fontSize: "70px",
                    marginBottom: "10px"
                  }}
                >
                  📦
                </div>

                <h1>
                  404
                </h1>

                <h2>
                  Page Not Found
                </h2>

                <p>
                  The page you are looking for does not exist.
                </p>

              </div>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;