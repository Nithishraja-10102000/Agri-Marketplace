import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH MY PRODUCTS
  // ==========================================

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products/my");

      console.log("My Products:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("My Products Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `http://localhost:5000${image}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingIcon}>🌾</div>

          <h2>Loading products...</h2>

          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div style={styles.container}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <div style={styles.headerText}>
          <h1>📦 My Products</h1>

          <p>
            Manage the agricultural products you
            have added to the marketplace.
          </p>
        </div>

        {/* BUTTONS */}

        <div style={styles.headerActions}>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate("/farmer/add-product")
            }
          >
            ➕ Add Product
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              navigate("/farmer/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div style={styles.error}>
          ⚠️ {error}
        </div>
      )}


      {/* ================= TOTAL ================= */}

      <div style={styles.totalProducts}>
        📦 Total Products:{" "}
        <strong>{products.length}</strong>
      </div>


      {/* ================= EMPTY ================= */}

      {products.length === 0 ? (

        <div style={styles.empty}>

          <div style={styles.emptyIcon}>
            📦
          </div>

          <h2>No Products Yet</h2>

          <p>
            Add your first agricultural product
            to the marketplace.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate("/farmer/add-product")
            }
          >
            ➕ Add Your First Product
          </button>

        </div>

      ) : (

        /* ================= PRODUCTS ================= */

        <div style={styles.grid}>

          {products.map((product) => {

            const imageUrl =
              getImageUrl(product.image);

            return (
              <div
                key={product._id}
                style={styles.card}
              >

                {/* IMAGE */}

                <div style={styles.imageContainer}>

                  {imageUrl ? (

                    <img
                      src={imageUrl}
                      alt={product.name}
                      style={styles.image}
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";

                        e.currentTarget.nextSibling.style.display =
                          "flex";
                      }}
                    />

                  ) : null}

                  <div
                    style={{
                      ...styles.noImage,
                      display: imageUrl
                        ? "none"
                        : "flex"
                    }}
                  >
                    📦
                  </div>

                </div>


                {/* TOP ROW */}

                <div style={styles.topRow}>

                  <span style={styles.category}>
                    {product.category}
                  </span>

                  <span style={styles.status}>
                    {product.status}
                  </span>

                </div>


                {/* NAME */}

                <h2 style={styles.productName}>
                  {product.name}
                </h2>


                {/* DETAILS */}

                <p>
                  📦{" "}
                  <strong>Quantity:</strong>{" "}
                  {product.quantity}{" "}
                  {product.unit}
                </p>


                <p style={styles.price}>
                  ₹{product.price} /{" "}
                  {product.unit}
                </p>


                <p>
                  ⭐{" "}
                  <strong>Quality:</strong>{" "}
                  {product.quality ||
                    "Not specified"}
                </p>


                <p>
                  📍{" "}
                  <strong>Location:</strong>{" "}
                  {product.location ||
                    "Not provided"}
                </p>


                {product.harvestDate && (
                  <p>
                    📅{" "}
                    <strong>Harvest Date:</strong>{" "}
                    {new Date(
                      product.harvestDate
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>
                )}


                {product.description && (
                  <p style={styles.description}>
                    📝 {product.description}
                  </p>
                )}


                {/* DELETE */}

                <button
                  type="button"
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  style={styles.deleteButton}
                >
                  🗑️ Delete
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}


// ==========================================
// STYLES
// ==========================================

const styles = {

  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f5f5f5"
  },

  // HEADER

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },

  headerText: {
    flex: "1 1 300px"
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  },

  totalProducts: {
    marginBottom: "20px",
    fontSize: "16px"
  },

  // GRID

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "25px"
  },

  // CARD

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },

  // IMAGE

  imageContainer: {
    width: "100%",
    height: "220px",
    marginBottom: "15px",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#e8f5e9"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },

  noImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "70px"
  },

  // TOP ROW

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap"
  },

  category: {
    padding: "5px 10px",
    borderRadius: "15px",
    background: "#e8f5e9",
    fontSize: "13px",
    fontWeight: "600"
  },

  status: {
    padding: "5px 10px",
    borderRadius: "15px",
    background: "#fff3cd",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "capitalize"
  },

  productName: {
    marginTop: "10px",
    marginBottom: "12px"
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "12px 0"
  },

  description: {
    lineHeight: "1.6",
    color: "#666"
  },

  // DELETE

  deleteButton: {
    width: "100%",
    marginTop: "15px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    padding: "11px 15px",
    cursor: "pointer",
    borderRadius: "6px",
    fontWeight: "600"
  },

  // EMPTY

  empty: {
    textAlign: "center",
    padding: "60px 30px",
    background: "white",
    borderRadius: "12px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.08)"
  },

  emptyIcon: {
    fontSize: "60px",
    marginBottom: "10px"
  },

  // ERROR

  error: {
    padding: "12px 15px",
    color: "#b71c1c",
    background: "#ffebee",
    borderRadius: "8px",
    marginBottom: "15px"
  },

  // LOADING

  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5"
  },

  loadingCard: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.1)"
  },

  loadingIcon: {
    fontSize: "50px"
  }
};

export default MyProducts;