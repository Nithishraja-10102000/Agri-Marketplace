import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function FarmerEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      const response = await API.get("/enquiries/farmer");

      setEnquiries(response.data.enquiries || []);
    } catch (error) {
      console.error("Enquiries Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load enquiries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/enquiries/${id}/status`, {
        status
      });

      fetchEnquiries();

    } catch (error) {
      console.error("Status Update Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update enquiry"
      );
    }
  };

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading enquiries...</h2>;
  }

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <div style={styles.header}>

          <div>
            <h1>📩 Farmer Enquiries</h1>
            <p>Buyer requests for your products</p>
          </div>

          <button
            onClick={() =>
              navigate("/farmer/dashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <h2>
          Total Enquiries: {enquiries.length}
        </h2>

        {enquiries.length === 0 ? (

          <div style={styles.empty}>
            <h2>📭 No Enquiries Yet</h2>
            <p>
              Buyer enquiries will appear here.
            </p>
          </div>

        ) : (

          <div>

            {enquiries.map((enquiry) => (

              <div
                key={enquiry._id}
                style={styles.card}
              >

                <h2>
                  🌾 {enquiry.productId?.name}
                </h2>

                <p>
                  <strong>Buyer:</strong>{" "}
                  {enquiry.buyerId?.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {enquiry.buyerId?.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {enquiry.buyerId?.phone || "Not provided"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {enquiry.buyerId?.location}
                </p>

                <hr />

                <p>
                  📦 <strong>Quantity:</strong>{" "}
                  {enquiry.quantity}{" "}
                  {enquiry.productId?.unit}
                </p>

                <p>
                  💰 <strong>Offer Price:</strong>{" "}
                  ₹{enquiry.offerPrice} /{" "}
                  {enquiry.productId?.unit}
                </p>

                <p>
                  📝 <strong>Message:</strong>{" "}
                  {enquiry.message || "No message"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span>
                    {enquiry.status}
                  </span>
                </p>

                {enquiry.status === "pending" && (

                  <div style={styles.actions}>

                    <button
                      style={styles.accept}
                      onClick={() =>
                        updateStatus(
                          enquiry._id,
                          "accepted"
                        )
                      }
                    >
                      ✅ Accept
                    </button>

                    <button
                      style={styles.reject}
                      onClick={() =>
                        updateStatus(
                          enquiry._id,
                          "rejected"
                        )
                      }
                    >
                      ❌ Reject
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7f5",
    padding: "30px"
  },

  container: {
    maxWidth: "900px",
    margin: "auto"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    padding: "25px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },

  accept: {
    padding: "10px 20px",
    cursor: "pointer"
  },

  reject: {
    padding: "10px 20px",
    cursor: "pointer"
  },

  error: {
    background: "#ffebee",
    color: "red",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px"
  },

  empty: {
    textAlign: "center",
    background: "white",
    padding: "50px",
    borderRadius: "12px"
  }
};

export default FarmerEnquiries;