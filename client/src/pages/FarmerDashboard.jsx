import { useNavigate } from "react-router-dom";

function FarmerDashboard() {
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


      {/* DASHBOARD CONTENT */}

      <main className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <span className="hero-tag">
              🌾 Farmer Account
            </span>

            <h1>
              Welcome, {user?.name || "Farmer"}!
            </h1>

            <p>
              Manage your agricultural products and buyer enquiries.
            </p>
          </div>

        </div>


        {/* USER INFO */}

        <div className="dashboard-profile">

          <div className="profile-icon">
            👨‍🌾
          </div>

          <div>
            <h3>{user?.name}</h3>

            <p>{user?.email}</p>

            <span>
              📍 {user?.location || "Location not provided"}
            </span>
          </div>

        </div>


        {/* ACTION CARDS */}

        <div className="dashboard-section">

          <h2>Manage Your Farm</h2>

          <div className="card-grid">

            {/* ADD PRODUCT */}

            <div
              className="card dashboard-action-card"
              onClick={() =>
                navigate("/farmer/add-product")
              }
            >
              <div className="card-icon">
                🌱
              </div>

              <h3>Add Product</h3>

              <p>
                List your fresh agricultural products
                for buyers.
              </p>

              <span className="action-link">
                Add Product →
              </span>
            </div>


            {/* MY PRODUCTS */}

            <div
              className="card dashboard-action-card"
              onClick={() =>
                navigate("/farmer/my-products")
              }
            >
              <div className="card-icon">
                📦
              </div>

              <h3>My Products</h3>

              <p>
                View and manage the products you
                have listed.
              </p>

              <span className="action-link">
                View Products →
              </span>
            </div>


            {/* ENQUIRIES */}

            <div
              className="card dashboard-action-card"
              onClick={() =>
                navigate("/farmer/enquiries")
              }
            >
              <div className="card-icon">
                📩
              </div>

              <h3>Buyer Enquiries</h3>

              <p>
                Review requests and offers from
                interested buyers.
              </p>

              <span className="action-link">
                View Enquiries →
              </span>
            </div>

          </div>

        </div>


        {/* QUICK INFO */}

        <div className="farmer-info">

          <div>
            <span>🌾</span>
            <strong>Sell Directly</strong>
            <p>
              Connect directly with buyers.
            </p>
          </div>

          <div>
            <span>💰</span>
            <strong>Better Pricing</strong>
            <p>
              Set your own product prices.
            </p>
          </div>

          <div>
            <span>🤝</span>
            <strong>Build Connections</strong>
            <p>
              Grow your buyer network.
            </p>
          </div>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="footer">
        <p>🌾 Agri Marketplace</p>
        <p>
          Connecting farms with opportunities.
        </p>
      </footer>

    </div>
  );
}

export default FarmerDashboard;