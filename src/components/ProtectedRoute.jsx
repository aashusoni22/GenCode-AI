import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthRedirectRoute = ({ children, authentication = true }) => {
  const { isLoggedIn, loading } = useAuthContext();
  const location = useLocation();

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

  if (authentication && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  } else if (!authentication && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirectRoute;
