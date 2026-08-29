import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function BuyerEnquiry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct(
          response.data.product || response.data
        );
      } catch (err) {
        console.error("Product Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !offerPrice || !message.trim()) {
      setError("Please fill all enquiry fields.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await API.post("/enquiries", {
        productId: id,
        quantity: Number(quantity),
        offerPrice: Number(offerPrice),
        message: message.trim()
      });

      alert("Enquiry sent successfully! 📩");

      navigate("/buyer/enquiries");

    } catch (err) {
      console.error(
        "Enquiry Error:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
          "Failed to send enquiry"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <main className="dashboard-container">
          <div className="card" style={{ textAlign: "center" }}>
            <div className="card-icon">📩</div>
            <h2>Loading...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="dashboard">
        <main className="dashboard-container">
          <div className="card" style={{ textAlign: "center" }}>
            <div className="card-icon">📦</div>

            <h2>Product Not Found</h2>

            <p style={{ margin: "10px 0 20px" }}>
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/buyer/marketplace")
              }
            >
              ← Marketplace
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo-area">

          <img
            src="/agri-logo.jpeg"
            alt="Agri Marketplace"
            className="logo"
          />

          <div className="brand">
            Agri <span>Marketplace</span>
          </div>

        </div>

        <div className="nav-links">

          <button
            className="btn btn-outline"
            onClick={() =>
              navigate("/buyer/marketplace")
            }
          >
            Marketplace
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/buyer/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <main className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <span className="hero-tag">
              📩 Product Enquiry
            </span>

            <h1>
              Send Enquiry
            </h1>

            <p>
              Contact the farmer and make your offer.
            </p>

          </div>

        </div>


        <div className="enquiry-layout">

          {/* PRODUCT SUMMARY */}

          <div className="product-card">

            <div className="product-hero">
              🌾
            </div>

            <div className="product-content">

              <p className="product-category">
                {product.category}
              </p>

              <h2>
                {product.name}
              </h2>

              <div className="price">
                ₹{product.price} / {product.unit}
              </div>

              <div className="product-info">

                <p>
                  📦 <strong>Available:</strong>{" "}
                  {product.quantity} {product.unit}
                </p>

                <p>
                  ⭐ <strong>Quality:</strong>{" "}
                  {product.quality || "Not specified"}
                </p>

                <p>
                  📍 <strong>Location:</strong>{" "}
                  {product.location || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          {/* ENQUIRY FORM */}

          <div className="card">

            <h2 className="form-title">
              📩 Enquiry Details
            </h2>

            <p className="form-subtitle">
              Enter the quantity and price you would
              like to offer.
            </p>

            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Quantity ({product.unit})
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder={`Enter quantity in ${product.unit}`}
                />

              </div>


              <div className="form-group">

                <label>
                  Offer Price (₹ / {product.unit})
                </label>

                <input
                  type="number"
                  min="1"
                  value={offerPrice}
                  onChange={(e) =>
                    setOfferPrice(e.target.value)
                  }
                  placeholder="Enter your offer price"
                />

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Write your requirements..."
                />

              </div>


              <button
                type="submit"
                className="btn btn-primary enquiry-submit"
                disabled={submitting}
              >
                {submitting
                  ? "Sending..."
                  : "📩 Send Enquiry"}
              </button>

              <button
                type="button"
                className="btn btn-outline enquiry-cancel"
                onClick={() =>
                  navigate(`/buyer/product/${id}`)
                }
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      </main>


      <footer className="footer">

        <p>
          🌾 Agri Marketplace
        </p>

        <p>
          Connecting farms with opportunities.
        </p>

      </footer>

    </div>
  );
}

export default BuyerEnquiry;