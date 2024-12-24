import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// Lottie
import Lottie from "lottie-react";
import login from "../../assets/login.json";
import { AuthContext } from "../../AuthProvider/AuthProvider";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully Signed in",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch(() => setError("Invalid email or password"));
  };
  const handleSignInwithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="bg-gradient-to-t from-gray-100 to-gray-100">
      <div className="w-10/12 mx-auto flex justify-center min-h-screen items-center gap-10 ">
        <div className="flex-grow">
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input rounded-none focus:outline-none"
                required
              />
            </div>
            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input rounded-none focus:outline-none"
                required
              />
              <div
                onClick={() => setShow(!show)}
                className="absolute right-3 bottom-4"
              >
                {show ? (
                  <FaRegEyeSlash className="text-gray-700"></FaRegEyeSlash>
                ) : (
                  <FaRegEye className="text-gray-700"></FaRegEye>
                )}
              </div>
            </div>
            {/* Error handling */}
            <div className="mt-2">
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
            <div className="mt-2">
              <p className="text-sm hover:underline hover:cursor-pointer">
                Forgot password?
              </p>
            </div>
            {/* Sign In button */}
            <div className="form-control mt-6">
              <button className="btn text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 hover:scale-105 duration-500 rounded-none">
                Sign In
              </button>
            </div>
          </form>
          <div className="form-control mt-3">
            <button
              onClick={handleSignInwithGoogle}
              className="btn bg-white border border-gray-300 hover:scale-105 duration-500 rounded-none"
            >
              <FcGoogle />
              Sign in with Google
            </button>
          </div>
          <div className="mt-3">
            <p className="text-center">
              New in this website?{" "}
              <Link
                to="/auth/register"
                className="text-indigo-500 hover:opacity-50"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <figure className="max-sm:hidden w-1/2">
          <Lottie className="w-full" animationData={login} />
        </figure>
      </div>
    </div>
  );
};

export default Login;
