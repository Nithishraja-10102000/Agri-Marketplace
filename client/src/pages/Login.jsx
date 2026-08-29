import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "farmer") {
        navigate("/farmer/dashboard");
      } else {
        navigate("/buyer/dashboard");
      }

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
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

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Login to your Agri Marketplace account
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "8px"
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px"
          }}
        >
          <p style={{ color: "var(--muted)" }}>
            Don't have an account?
          </p>

          <button
            type="button"
            className="btn btn-outline"
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>

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

export default Login;