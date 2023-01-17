import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: JSX.Element
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const jwt = localStorage.getItem("jwt");

  return jwt ? component : <Navigate to="/" />;
};

export default ProtectedRoute;