import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import register from "../../assets/register.json";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Logo from "../Shared/Logo";

const Register = () => {
  const { registerUser, setUser, signInWithGoogle, updateUsersProfileInfo } =
    useContext(AuthContext);

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    // Password validation
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!strongPassword.test(password)) {
      setError(
        "Password must be at least 6 characters and include both uppercase and lowercase letters."
      );
      return;
    }

    registerUser(email, password)
      .then((result) => {
        updateUsersProfileInfo({ displayName: name, photoURL: photo })
          .then(() => {
            setUser(result.user);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "successfully Registered",
              showConfirmButton: false,
              timer: 1000,
            });
            setTimeout(() => {
              navigate("/");
            }, 1200);
          })
          .catch((error) => setError(error));
      })
      .catch(() => toast.warn("This email is already used"));
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
          navigate("/");
        }, 1200);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="bg-gradient-to-t from-gray-100 to-gray-100">
      <div className="max-w-md mx-auto flex flex-col min-h-screen justify-center px-6">
        <div className="flex-grow">
          <div className="text-center py-5">
            <Logo />
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input rounded-none focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder="photo URL"
                name="photo"
                className="input rounded-none focus:outline-none"
                required
              />
            </div>
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
                  <FaRegEyeSlash></FaRegEyeSlash>
                ) : (
                  <FaRegEye className="text-gray-700"></FaRegEye>
                )}
              </div>
            </div>
            <div className="mt-2">
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white bg-red-600 duration-500 rounded-none">
                Register
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
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                className="text-red-500 hover:opacity-50"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
