import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>

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

          <a href="#home">
            Home
          </a>

          <a href="#features">
            Features
          </a>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>

      </nav>


      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <div className="hero-tag">
            🌾 From Farm to Market
          </div>

          <h1>
            Connecting
            <br />

            <span>Farmers</span> & Buyers
          </h1>

          <p>
            A trusted digital marketplace connecting
            farmers directly with buyers. Discover
            fresh agricultural products, negotiate
            prices, and build better farm-to-market
            connections.
          </p>

          <div className="hero-buttons">

            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              🌱 Join as Farmer
            </button>

            <button
              className="btn btn-gold"
              onClick={() => navigate("/register")}
            >
              🛒 Join as Buyer
            </button>

          </div>

        </div>


        <div className="hero-logo-container">

          <img
            src="/agri-logo.jpeg"
            alt="Agriculture"
            className="hero-logo"
          />

        </div>

      </section>


      {/* FEATURES */}

      <section
        className="section"
        id="features"
      >

        <div className="section-heading">

          <h2>
            Built for Agriculture
          </h2>

          <p>
            Everything you need for a better
            farm-to-market experience.
          </p>

        </div>


        <div className="card-grid">

          <div className="card">

            <div className="card-icon">
              🌾
            </div>

            <h3>
              For Farmers
            </h3>

            <p>
              List your agricultural products,
              set prices, and connect directly
              with buyers.
            </p>

          </div>


          <div className="card">

            <div className="card-icon">
              🛒
            </div>

            <h3>
              For Buyers
            </h3>

            <p>
              Discover fresh products and
              send enquiries directly to farmers.
            </p>

          </div>


          <div className="card">

            <div className="card-icon">
              🤝
            </div>

            <h3>
              Direct Connection
            </h3>

            <p>
              Reduce unnecessary intermediaries
              and build direct business relationships.
            </p>

          </div>


          <div className="card">

            <div className="card-icon">
              🔒
            </div>

            <h3>
              Secure Platform
            </h3>

            <p>
              Secure authentication and protected
              accounts keep your marketplace activity safe.
            </p>

          </div>

        </div>

      </section>


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

export default Home;