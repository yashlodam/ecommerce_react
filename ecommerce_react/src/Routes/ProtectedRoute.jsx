import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../State/Store";

/**
 * ProtectedRoute — Blocks unauthenticated or wrong-role access.
 *
 * Usage:
 *   <ProtectedRoute>               → requires any login
 *   <ProtectedRoute role="ROLE_SELLER">  → requires seller login
 *   <ProtectedRoute role="ROLE_ADMIN">   → requires admin login
 */
function ProtectedRoute({ children, role }) {
  const { isLoggedIn, jwt, role: userRole } = useAppSelector(
    (state) => state.auth
  );
  const location = useLocation();

  // Not logged in at all → go to login
  const loggedIn = isLoggedIn && (jwt || localStorage.getItem("jwt"));
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Wrong role → redirect to appropriate home
  if (role && userRole && userRole !== role) {
    if (userRole === "ROLE_SELLER") return <Navigate to="/seller" replace />;
    if (userRole === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
