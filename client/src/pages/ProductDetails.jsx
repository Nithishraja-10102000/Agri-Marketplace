import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import API from "../services/api";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await API.get(
            `/products/${id}`
          );


        setProduct(
          response.data.product ||
          response.data
        );

      } catch (err) {

        console.error(
          "Product Details Error:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load product details"
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {

      fetchProduct();

    } else {

      setError(
        "Product ID is missing"
      );

      setLoading(false);

    }

  }, [id]);


  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = () => {

    if (!product?.image) {
      return null;
    }


    if (
      product.image.startsWith(
        "http://"
      ) ||
      product.image.startsWith(
        "https://"
      )
    ) {

      return product.image;

    }


    return `${import.meta.env.VITE_API_URL}${product.image}`;

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="dashboard">

        <div className="dashboard-container">

          <div
            className="card"
            style={styles.centerCard}
          >

            <div className="card-icon">
              🌾
            </div>

            <h2>
              Loading Product...
            </h2>

            <p>
              Please wait while we load
              the product details.
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error || !product) {

    return (

      <div className="dashboard">

        <div className="dashboard-container">

          <div
            className="card"
            style={styles.centerCard}
          >

            <div className="card-icon">
              📦
            </div>

            <h2>
              Product Not Found
            </h2>

            <p
              style={{
                marginBottom: "20px"
              }}
            >
              {error ||
                "This product does not exist."}
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  "/buyer/marketplace"
                )
              }
            >
              ← Back to Marketplace
            </button>

          </div>

        </div>

      </div>

    );

  }


  const imageUrl =
    getImageUrl();


  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

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

            Agri{" "}

            <span>
              Marketplace
            </span>

          </div>

        </div>


        <div className="nav-links">

          <button
            className="btn btn-outline"
            onClick={() =>
              navigate(
                "/buyer/dashboard"
              )
            }
          >
            Dashboard
          </button>


          <button
            className="btn btn-primary"
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              navigate("/login");

            }}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <main className="dashboard-container">


        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <span className="hero-tag">
              🌾 Marketplace Product
            </span>

            <h1>
              Product Details
            </h1>

            <p>
              View product information
              and connect directly with
              the farmer.
            </p>

          </div>


          <div className="dashboard-actions">

            <button
              className="btn btn-outline"
              onClick={() =>
                navigate(
                  "/buyer/marketplace"
                )
              }
            >
              ← Marketplace
            </button>

          </div>

        </div>


        {/* PRODUCT LAYOUT */}

        <div className="details-grid">


          {/* PRODUCT CARD */}

          <div className="product-card">


            {/* FARMER IMAGE */}

            <div
              className="product-hero"
              style={{
                minHeight: "350px",
                display: "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                overflow: "hidden"
              }}
            >

              {imageUrl ? (

                <img
                  src={imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover"
                  }}

                  onError={(e) => {

                    e.currentTarget.style.display =
                      "none";

                  }}
                />

              ) : (

                <span
                  style={{
                    fontSize: "90px"
                  }}
                >
                  📦
                </span>

              )}

            </div>


            <div className="product-content">


              {/* TITLE */}

              <div
                className="product-title-row"
              >

                <div>

                  <p
                    className=
                      "product-category"
                  >
                    {product.category}
                  </p>

                  <h2>
                    {product.name}
                  </h2>

                </div>


                <span
                  className=
                    "status status-accepted"
                >
                  {product.status ||
                    "Available"}
                </span>

              </div>


              {/* PRICE */}

              <div
                className="details-price"
              >

                ₹{product.price}

                <span>
                  / {product.unit}
                </span>

              </div>


              {/* INFO */}

              <div
                className="details-info"
              >

                <div>

                  <span>📦</span>

                  <div>

                    <small>
                      Quantity
                    </small>

                    <strong>

                      {product.quantity}{" "}

                      {product.unit}

                    </strong>

                  </div>

                </div>


                <div>

                  <span>⭐</span>

                  <div>

                    <small>
                      Quality
                    </small>

                    <strong>
                      {product.quality ||
                        "Not specified"}
                    </strong>

                  </div>

                </div>


                <div>

                  <span>📍</span>

                  <div>

                    <small>
                      Location
                    </small>

                    <strong>
                      {product.location ||
                        "Not provided"}
                    </strong>

                  </div>

                </div>


                <div>

                  <span>📅</span>

                  <div>

                    <small>
                      Harvest Date
                    </small>

                    <strong>

                      {product.harvestDate

                        ? new Date(
                            product.harvestDate
                          ).toLocaleDateString(
                            "en-IN"
                          )

                        : "Not provided"}

                    </strong>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div
                className=
                  "details-description"
              >

                <h3>
                  Product Description
                </h3>

                <p>
                  {product.description ||
                    "No description provided."}
                </p>

              </div>

            </div>

          </div>


          {/* FARMER CARD */}

          <div
            className=
              "card farmer-details-card"
          >

            <div className="card-icon">
              👨‍🌾
            </div>

            <h3>
              Farmer Details
            </h3>

            <p
              className=
                "farmer-subtitle"
            >
              Connect directly with
              the producer.
            </p>


            <div
              className=
                "farmer-info-list"
            >

              <div>

                <small>
                  Name
                </small>

                <strong>

                  {product.farmerId?.name ||
                    product.farmer?.name ||
                    "Farmer"}

                </strong>

              </div>


              <div>

                <small>
                  Email
                </small>

                <strong>

                  {product.farmerId?.email ||
                    product.farmer?.email ||
                    "Not provided"}

                </strong>

              </div>


              <div>

                <small>
                  Phone
                </small>

                <strong>

                  {product.farmerId?.phone ||
                    product.farmer?.phone ||
                    "Not provided"}

                </strong>

              </div>


              <div>

                <small>
                  Location
                </small>

                <strong>

                  {product.farmerId?.location ||
                    product.location ||
                    "Not provided"}

                </strong>

              </div>

            </div>


            {/* ENQUIRY */}

            <button
              className=
                "btn btn-primary enquiry-button"
              onClick={() =>
                navigate(
                  `/buyer/enquire/${product._id}`
                )
              }
            >
              📩 Send Enquiry
            </button>

          </div>

        </div>

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


// ==========================================
// STYLES
// ==========================================

const styles = {

  centerCard: {

    textAlign: "center",

    maxWidth: "500px",

    margin: "80px auto"

  }

};


export default ProductDetails;