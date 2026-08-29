import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "kg",
    price: "",
    quality: "Grade A",
    harvestDate: "",
    location: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ==============================
  // HANDLE IMAGE
  // ==============================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    setError("");
    setMessage("");

    if (!file) {
      setImage(null);
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      setImage(null);
      return;
    }

    // Check file size - 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      setImage(null);
      return;
    }

    setImage(file);
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Basic validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.quantity ||
      !formData.price ||
      !formData.location
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (Number(formData.quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      // IMPORTANT:
      // Use FormData because image is being uploaded
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("quantity", formData.quantity);
      data.append("unit", formData.unit);
      data.append("price", formData.price);
      data.append("quality", formData.quality);
      data.append("location", formData.location);
      data.append("description", formData.description);

      if (formData.harvestDate) {
        data.append(
          "harvestDate",
          formData.harvestDate
        );
      }

      // IMPORTANT:
      // Backend multer must use upload.single("image")
      if (image) {
        data.append("image", image);
      }

      console.log("Sending product...");

      const response = await API.post(
        "/products",
        data
      );

      console.log(
        "Product Response:",
        response.data
      );

      setMessage(
        "Product added successfully! 🌾"
      );

      // Reset form
      setFormData({
        name: "",
        category: "",
        quantity: "",
        unit: "kg",
        price: "",
        quality: "Grade A",
        harvestDate: "",
        location: "",
        description: ""
      });

      setImage(null);

      // Clear file input
      const fileInput =
        document.getElementById("product-image");

      if (fileInput) {
        fileInput.value = "";
      }

      // Go to My Products after short delay
      setTimeout(() => {
        navigate("/farmer/my-products");
      }, 1000);

    } catch (err) {
      console.error(
        "Add Product Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* HEADER */}

        <div style={styles.header}>

          <div>
            <h1 style={styles.title}>
              🌾 Add Agricultural Product
            </h1>

            <p style={styles.subtitle}>
              List your fresh products for buyers
              to discover.
            </p>
          </div>

        </div>

        {/* MESSAGE */}

        {message && (
          <div style={styles.success}>
            ✅ {message}
          </div>
        )}

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Product Name *
            </label>

            <input
              type="text"
              name="name"
              placeholder="Example: Tomato"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

          </div>

          {/* CATEGORY */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Vegetables">
                Vegetables
              </option>

              <option value="Fruits">
                Fruits
              </option>

              <option value="Grains">
                Grains
              </option>

              <option value="Pulses">
                Pulses
              </option>

              <option value="Spices">
                Spices
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* IMAGE */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Product Image
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              style={styles.fileInput}
            />

            <small style={styles.helpText}>
              Upload a clear image of your
              agricultural product.
              Maximum 5 MB.
            </small>

            {/* IMAGE PREVIEW */}

            {image && (
              <div style={styles.previewContainer}>

                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  style={styles.preview}
                />

                <p style={styles.fileName}>
                  {image.name}
                </p>

              </div>
            )}

          </div>

          {/* QUANTITY */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Quantity *
            </label>

            <input
              type="number"
              name="quantity"
              placeholder="Example: 500"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              style={styles.input}
              required
            />

          </div>

          {/* UNIT */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Unit
            </label>

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              style={styles.input}
            >

              <option value="kg">
                Kilogram (kg)
              </option>

              <option value="ton">
                Ton
              </option>

              <option value="quintal">
                Quintal
              </option>

              <option value="box">
                Box
              </option>

            </select>

          </div>

          {/* PRICE */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Price per Unit *
            </label>

            <input
              type="number"
              name="price"
              placeholder="Example: 40"
              value={formData.price}
              onChange={handleChange}
              min="1"
              style={styles.input}
              required
            />

          </div>

          {/* QUALITY */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Quality
            </label>

            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              style={styles.input}
            >

              <option value="Grade A">
                Grade A
              </option>

              <option value="Grade B">
                Grade B
              </option>

              <option value="Grade C">
                Grade C
              </option>

            </select>

          </div>

          {/* HARVEST DATE */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Harvest Date
            </label>

            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              style={styles.input}
            />

          </div>

          {/* LOCATION */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Location *
            </label>

            <input
              type="text"
              name="location"
              placeholder="Example: Coimbatore"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              style={{
                ...styles.input,
                resize: "vertical"
              }}
            />

          </div>

          {/* BUTTONS */}

          <div style={styles.buttons}>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.addButton,
                opacity: loading ? 0.7 : 1
              }}
            >

              {loading
                ? "⏳ Adding Product..."
                : "🌾 Add Product"}

            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/farmer/dashboard")
              }
              style={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


// ==============================
// STYLES
// ==============================

const styles = {

  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f5f7f5"
  },

  card: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.08)"
  },

  header: {
    marginBottom: "25px"
  },

  title: {
    margin: 0,
    fontSize: "30px",
    color: "#245c2a"
  },

  subtitle: {
    marginTop: "8px",
    color: "#666"
  },

  formGroup: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d5d5d5",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none"
  },

  fileInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px dashed #aaa",
    borderRadius: "8px",
    background: "#fafafa"
  },

  helpText: {
    display: "block",
    marginTop: "7px",
    color: "#777"
  },

  previewContainer: {
    marginTop: "15px",
    textAlign: "center",
    padding: "15px",
    background: "#f7f7f7",
    borderRadius: "10px"
  },

  preview: {
    width: "220px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  fileName: {
    margin: "8px 0 0",
    fontSize: "14px",
    color: "#555"
  },

  success: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    background: "#e8f5e9",
    color: "#2e7d32"
  },

  error: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    background: "#ffebee",
    color: "#c62828"
  },

  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "25px"
  },

  addButton: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#2e7d32",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "13px 25px",
    border: "1px solid #aaa",
    borderRadius: "8px",
    background: "#fff",
    color: "#555",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default AddProduct;