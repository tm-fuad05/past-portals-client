/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const PrivateLayout = ({ children }) => {
  const { user, loader } = useAuth();

  const location = useLocation();

  if (loader) {
    return (
      <div>
        <span className="loading loading-ring loading-lg  min-h-screen flex items-center mx-auto"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/auth/sign-in"></Navigate>;
  }

  return children;
};

export default PrivateLayout;
