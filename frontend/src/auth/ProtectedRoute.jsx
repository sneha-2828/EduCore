import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { user } = useContext(AuthContext);

  // ⛔ Not logged in
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Role mismatch (if role is specified)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children ? children : <Outlet />;
}
