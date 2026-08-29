import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BuyerEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/enquiries/buyer");

      console.log("Buyer Enquiries:", response.data);

      setEnquiries(
        response.data.enquiries || []
      );
    } catch (err) {
      console.error(
        "Buyer Enquiries Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load enquiries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <span className="hero-tag">
              📩 My Enquiries
            </span>

            <h1>My Enquiries</h1>

            <p>
              Track your product requests
            </p>
          </div>

          <div className="dashboard-actions">

            <button
              className="btn btn-outline"
              onClick={() =>
                navigate("/buyer/dashboard")
              }
            >
              ← Dashboard
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/buyer/marketplace")
              }
            >
              🛒 Marketplace
            </button>

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="card">
            <h2>Loading enquiries...</h2>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="card">

            <h2>Unable to load enquiries</h2>

            <p style={{ color: "red" }}>
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={fetchEnquiries}
            >
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          enquiries.length === 0 && (
            <div
              className="card"
              style={{
                textAlign: "center",
                padding: "50px"
              }}
            >

              <div
                style={{
                  fontSize: "55px"
                }}
              >
                📩
              </div>

              <h2>
                No Enquiries Yet
              </h2>

              <p>
                You haven't sent any product
                enquiries yet.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(
                    "/buyer/marketplace"
                  )
                }
              >
                🛒 Browse Marketplace
              </button>

            </div>
          )}

        {/* ENQUIRIES */}

        {!loading &&
          !error &&
          enquiries.length > 0 && (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px"
              }}
            >

              {enquiries.map((enquiry) => {

                const product =
                  enquiry.productId || {};

                return (
                  <div
                    className="card"
                    key={enquiry._id}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        marginBottom: "15px"
                      }}
                    >

                      <span
                        className="hero-tag"
                      >
                        📦 Product
                      </span>

                      <span
                        className="status status-accepted"
                      >
                        {enquiry.status ||
                          "pending"}
                      </span>

                    </div>

                    <h2>
                      {product.name ||
                        enquiry.productName ||
                        "Product"}
                    </h2>

                    <p>
                      📦{" "}
                      <strong>
                        Quantity:
                      </strong>{" "}
                      {enquiry.quantity ||
                        "Not specified"}
                    </p>

                    <p>
                      💰{" "}
                      <strong>
                        Offered Price:
                      </strong>{" "}
                      ₹
                      {enquiry.price ||
                        enquiry.offeredPrice ||
                        "Not specified"}
                    </p>

                    <p>
                      👨‍🌾{" "}
                      <strong>
                        Farmer:
                      </strong>{" "}
                      {product.farmerId?.name ||
                        enquiry.farmer?.name ||
                        "Farmer"}
                    </p>

                    {enquiry.message && (
                      <div
                        style={{
                          marginTop: "15px",
                          padding: "12px",
                          background:
                            "#f5f5f5",
                          borderRadius: "8px"
                        }}
                      >
                        <strong>
                          Message
                        </strong>

                        <p>
                          {enquiry.message}
                        </p>
                      </div>
                    )}

                    <small
                      style={{
                        display: "block",
                        marginTop: "15px",
                        color: "#777"
                      }}
                    >
                      {enquiry.createdAt
                        ? new Date(
                            enquiry.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : ""}
                    </small>

                  </div>
                );
              })}

            </div>
          )}

      </div>

    </div>
  );
}

export default BuyerEnquiries;