import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Marketplace() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products");

      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Marketplace Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load marketplace"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL}${image}`;
  };

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
              navigate("/buyer/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <main className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <span className="hero-tag">
              🛒 Buyer Marketplace
            </span>

            <h1>
              Fresh From Farmers
            </h1>

            <p>
              Discover agricultural products
              directly from local farmers.
            </p>

          </div>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="card marketplace-message">
            <div className="card-icon">
              🌾
            </div>

            <h2>
              Loading products...
            </h2>

            <p>
              Please wait while we load the
              latest products.
            </p>
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="card marketplace-message">

            <div className="card-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Products
            </h2>

            <p>
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={fetchProducts}
              style={{ marginTop: "20px" }}
            >
              Try Again
            </button>

          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="card marketplace-message">

              <div className="card-icon">
                📦
              </div>

              <h2>
                No Products Available
              </h2>

              <p>
                Farmers haven't added any products
                yet.
              </p>

            </div>
          )}


        {/* PRODUCT GRID */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <div className="product-grid">

              {products.map((product) => {

                const imageUrl =
                  getImageUrl(product.image);

                return (
                  <div
                    className="product-card"
                    key={product._id}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="marketplace-image">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";

                            e.currentTarget.nextElementSibling.style.display =
                              "flex";
                          }}
                        />

                      ) : null}

                      {/* FALLBACK */}

                      <div
                        className="image-fallback"
                        style={{
                          display: imageUrl
                            ? "none"
                            : "flex"
                        }}
                      >
                        🌾
                      </div>

                    </div>


                    {/* PRODUCT CONTENT */}

                    <div className="product-content">

                      <p className="product-category">
                        {product.category}
                      </p>

                      <h2>
                        {product.name}
                      </h2>

                      <div className="price">
                        ₹{product.price}
                        <span>
                          {" "}
                          / {product.unit}
                        </span>
                      </div>


                      <div className="product-info">

                        <p>
                          📦{" "}
                          <strong>
                            Quantity:
                          </strong>{" "}
                          {product.quantity}{" "}
                          {product.unit}
                        </p>

                        <p>
                          ⭐{" "}
                          <strong>
                            Quality:
                          </strong>{" "}
                          {product.quality ||
                            "Not specified"}
                        </p>

                        <p>
                          📍{" "}
                          <strong>
                            Location:
                          </strong>{" "}
                          {product.location}
                        </p>

                        <p>
                          👨‍🌾{" "}
                          <strong>
                            Farmer:
                          </strong>{" "}
                          {product.farmerId?.name ||
                            "Farmer"}
                        </p>

                      </div>


                      {/* VIEW DETAILS */}

                      <button
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          marginTop: "18px"
                        }}
                        onClick={() =>
                          navigate(
                            `/buyer/product/${product._id}`
                          )
                        }
                      >
                        View Details →
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </main>


      {/* FOOTER */}

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

export default Marketplace;