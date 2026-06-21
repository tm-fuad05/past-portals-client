import React from "react";

import Login from "../Components/Authentication/Login";
import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
