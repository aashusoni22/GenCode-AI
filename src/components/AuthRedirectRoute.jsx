import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthRedirectRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">
          <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If already logged in, redirect to generate page or the saved location
  if (isLoggedIn) {
    const from = location.state?.from?.pathname || "/generate";
    return <Navigate to={from} replace />;
  }

  // If not logged in, render the auth component (login/signup)
  return children;
};

export default AuthRedirectRoute;
