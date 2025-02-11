import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import AuthFooter from "./AuthFooter";

const Auth = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
