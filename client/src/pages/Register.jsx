import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
    location: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.phone.trim() ||
      !formData.role ||
      !formData.location.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      console.log("REGISTER RESPONSE:", response.data);

      alert("Registration successful! 🌾");

      navigate("/login");

    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <img
          src="/agri-logo.jpeg"
          alt="Agri Marketplace"
          className="form-logo"
        />

        <h1>Create Account</h1>

        <p className="subtitle">
          Join farmers and buyers on Agri Marketplace
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>

          {/* ROLE */}

          <div className="form-group">
            <label>Account Type</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="buyer">
                🛒 Buyer
              </option>

              <option value="farmer">
                🌾 Farmer
              </option>
            </select>
          </div>

          {/* LOCATION */}

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />
          </div>

          {/* REGISTER */}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "8px"
            }}
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* LOGIN */}

        <div
          style={{
            textAlign: "center",
            marginTop: "24px"
          }}
        >
          <p style={{ color: "var(--muted)" }}>
            Already have an account?
          </p>

          <button
            type="button"
            className="btn btn-outline"
            style={{
              marginTop: "10px"
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* HOME */}

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            display: "block",
            margin: "22px auto 0",
            border: "none",
            background: "transparent",
            color: "var(--primary)",
            fontWeight: "600"
          }}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Register;