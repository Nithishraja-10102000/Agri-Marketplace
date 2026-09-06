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
      console.log("Sending login request...");

      const response = await API.post(
        "/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid login response from server");
      }

      // Save login information
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Redirect based on role
      if (user.role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (user.role === "buyer") {
        navigate("/buyer/dashboard");
      } else {
        setError("Invalid user role");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error(
        "STATUS:",
        error.response?.status
      );
      console.error(
        "DATA:",
        error.response?.data
      );

      const serverMessage =
        error.response?.data?.message;

      if (serverMessage) {
        setError(serverMessage);
      } else if (error.response) {
        setError(
          `Server error (${error.response.status})`
        );
      } else if (error.request) {
        setError(
          "Cannot connect to server. Make sure the backend is running on port 5000."
        );
      } else {
        setError(
          error.message ||
          "Unable to login"
        );
      }

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
              required
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
              required
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
            {loading
              ? "Logging in..."
              : "Login"}
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
            style={{
              marginTop: "10px"
            }}
            onClick={() =>
              navigate("/register")
            }
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
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;