import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import AuthFooter from "./AuthFooter";

const Auth = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <AuthFooter></AuthFooter>
    </div>
  );
};

export default Auth;
