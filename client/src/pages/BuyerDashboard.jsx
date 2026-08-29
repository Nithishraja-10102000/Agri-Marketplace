import { useNavigate } from "react-router-dom";

function BuyerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className="btn btn-primary"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>
            <span className="hero-tag">
              🛒 Buyer Account
            </span>

            <h1>
              Welcome, {user.name || "Buyer"}!
            </h1>

            <p>
              Discover fresh agricultural products
              directly from farmers.
            </p>
          </div>

        </div>

        {/* PROFILE CARD */}
        <div className="dashboard-profile">

          <div className="profile-icon">
            🛒
          </div>

          <div className="profile-details">

            <h3>
              {user.name || "Buyer"}
            </h3>

            <p>
              {user.email || "Email not available"}
            </p>

            <span>
              📍 {user.location || "Location not provided"}
            </span>

          </div>

        </div>

        {/* ACTIONS */}
        <section className="dashboard-section">

          <div className="section-title-row">
            <div>
              <h2>Explore the Marketplace</h2>
              <p>
                Find products and manage your enquiries.
              </p>
            </div>
          </div>

          <div className="card-grid">

            {/* MARKETPLACE */}
            <div
              className="card dashboard-action-card"
              onClick={() => navigate("/buyer/marketplace")}
            >

              <div className="card-icon">
                🛒
              </div>

              <h3>
                Browse Marketplace
              </h3>

              <p>
                Explore fresh agricultural products
                available directly from farmers.
              </p>

              <span className="action-link">
                Browse Products →
              </span>

            </div>

            {/* ENQUIRIES */}
            <div
              className="card dashboard-action-card"
              onClick={() => navigate("/buyer/enquiries")}
            >

              <div className="card-icon">
                📩
              </div>

              <h3>
                My Enquiries
              </h3>

              <p>
                Track your product requests,
                offers and enquiry status.
              </p>

              <span className="action-link">
                View Enquiries →
              </span>

            </div>

          </div>

        </section>

        {/* BENEFITS */}
        <section className="farmer-info">

          <div>
            <span>🌾</span>
            <strong>Fresh Products</strong>
            <p>
              Find agricultural products directly
              from farmers.
            </p>
          </div>

          <div>
            <span>💰</span>
            <strong>Better Deals</strong>
            <p>
              Negotiate prices directly with farmers.
            </p>
          </div>

          <div>
            <span>🤝</span>
            <strong>Direct Connection</strong>
            <p>
              Build direct connections with producers.
            </p>
          </div>

        </section>

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

export default BuyerDashboard;