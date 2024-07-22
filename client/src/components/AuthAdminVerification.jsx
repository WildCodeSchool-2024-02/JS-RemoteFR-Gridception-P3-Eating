import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthAdminVerification() {
  const { auth } = useAuth();

  if (!auth || auth.role !== "admin") {
    return <Navigate to="/se-connecter" replace />;
  }

  return <Outlet />;
}
