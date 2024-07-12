import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthUserVerification() {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/se-connecter" replace />;
  }

  return <Outlet />;
}
