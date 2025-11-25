import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem("valid") === "true";
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    //Not logged in=redirect to login
    return <Navigate to="/log-in" replace />;
  }
  if (role && userRole !== role) {
    //Logged in but wrong role=redirect to home
    return <Navigate to="/" replace />;
  }
  //Logged in and role matches
  return children;
};

export default ProtectedRoute;
