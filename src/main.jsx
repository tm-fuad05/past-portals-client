import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import router from "./Router/routes.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="light"
      transition:Bounce
    />
  </StrictMode>
);
