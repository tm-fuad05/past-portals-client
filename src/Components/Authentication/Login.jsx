import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";

// Context & Tools
import { AuthContext } from "../../AuthProvider/AuthProvider";
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
          title: "Successfully Signed In",
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
          title: "Successfully Signed In",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1200);
      })
      .catch((error) => {
        setError(error?.message || "Google sign-in failed");
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 md:px-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs for Luxury Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-redStart/5 dark:bg-primaryRed/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-redEnd/5 dark:bg-lightRed/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Identity Branding */}
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        {/* Core Glassmorphic Form Terminal */}
        <div className="bg-white border border-gray-200/60 dark:bg-slate-900/40  dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-xl">
          <div className="space-y-1 mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              Welcome{" "}
              <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
                Back
              </span>
            </h2>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Access your secure terminal interface
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Controller Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
                Email Address
              </label>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
                <FiMail className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Controller Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Password
                </label>
                <span className="text-xs font-semibold text-primaryRed hover:underline cursor-pointer tracking-tight">
                  Forgot?
                </span>
              </div>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
                <FiLock className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 transition-colors" />
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none pr-8"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {show ? (
                    <FaRegEyeSlash className="text-base" />
                  ) : (
                    <FaRegEye className="text-base" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message Dashboard */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold px-3 py-2 rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-redStart to-redEnd text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 shadow-md shadow-primaryRed/10 active:scale-[0.99] transition-all mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Divider Network */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/5" />
            </div>
            <span className="relative bg-white dark:bg-[#0c1424] px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Or Infrastructure
            </span>
          </div>

          {/* Google Auth Integration */}
          <button
            type="button"
            onClick={handleSignInwithGoogle}
            className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all shadow-sm"
          >
            <FcGoogle className="text-lg" />
            <span className="uppercase tracking-wider text-xs">
              Sign in with Google
            </span>
          </button>

          {/* Registration Redirect Node */}
          <div className="mt-6 text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              New in this website?{" "}
              <Link
                to="/auth/register"
                className="text-primaryRed hover:underline font-bold ml-1 tracking-normal normal-case"
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
