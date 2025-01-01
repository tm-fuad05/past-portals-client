import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.status === 401 || error.status === 403) {
          signOutUser()
            .then(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are logged out.Please login again",
              });
              navigate("/auth/sign-in");
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong",
              });
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
