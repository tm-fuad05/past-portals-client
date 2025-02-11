import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// Lottie

import { AuthContext } from "../../AuthProvider/AuthProvider";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Logo from "../Shared/Logo";

const Login = () => {
  const { signInUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully Signed in",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1200);
      })
      .catch(() => setError("Invalid email or password"));
  };
  const handleSignInwithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully Signed in",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1200);
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className=" bg-gradient-to-t from-gray-100 to-gray-100">
      <div className="max-w-md px-8 mx-auto flex justify-center min-h-screen items-center gap-10">
        <div className="flex-grow">
          <div className="text-center py-5">
            <Logo />
          </div>
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
              <button className="btn text-white bg-red-600 duration-500 rounded-none">
                Sign In
              </button>
            </div>
          </form>
          <div className="form-control mt-3">
            <button
              onClick={handleSignInwithGoogle}
              className="btn bg-white border border-gray-300 duration-500 rounded-none"
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
                className="text-red-500 hover:opacity-50"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
