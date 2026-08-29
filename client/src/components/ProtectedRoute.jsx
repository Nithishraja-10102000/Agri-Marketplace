import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    if (user.role === "farmer") {
      return <Navigate to="/farmer/dashboard" replace />;
    }

    if (user.role === "buyer") {
      return <Navigate to="/buyer/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;