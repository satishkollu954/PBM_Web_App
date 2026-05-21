import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(["isAdminLoggedIn"]);

  // Check Login
  const isLoggedIn = cookies.isAdminLoggedIn;

  // If Not Logged In
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged In
  return children;
}
