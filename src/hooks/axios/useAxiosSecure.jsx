import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://past-portals-server.onrender.com/api/v1",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { signOutUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          try {
            if (!user?.email) {
              await Swal.fire({
                title: "Please sign in to like",
                icon: "error",
                showConfirmButton: false,
                timer: 1000,
              });
              return;
            }
            await signOutUser();
            await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You are logged out.Please login again",
            });
            navigate("/auth/sign-in");
          } catch (error) {
            console.error(error?.message);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
            });
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
