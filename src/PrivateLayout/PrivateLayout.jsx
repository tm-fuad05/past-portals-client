import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateLayout = ({ children }) => {
  const { user, loader } = useContext(AuthContext);

  const location = useLocation();

  if (loader) {
    return (
      <div>
        <span className="loading loading-ring loading-lg  min-h-screen flex items-center mx-auto"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/auth/sign-in"></Navigate>;
};

export default PrivateLayout;
