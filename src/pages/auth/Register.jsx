/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// React Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiUser, FiImage, FiMail, FiLock } from "react-icons/fi";

// Context & Tools
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Logo from "../../components/shared/Logo";
import { useAuth } from "../../provider/AuthProvider";
import { signUpSchema } from "../../validation/signUp.validation";
import { SocialLogin } from "../../components/shared/socialLogin";
import { useUploadUserImage } from "../../hooks/useUploadImage";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const { registerUser, setUser, updateUsersProfileInfo } = useAuth();
  const userUploadMutation = useUploadUserImage();

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState([]);
  const [authError, setAuthError] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: null,
    photo: null,
    email: null,
    password: null,
  });

  // Errors
  const nameError = error?.find((err) => err.field === "name");
  const photoError = error?.find((err) => err.field === "photo");
  const emailError = error?.find((err) => err.field === "email");
  const passError = error?.find((err) => err.field === "password");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, photo: file }));

    if (photoError) setError((prev) => [...prev, (photoError.message = "")]);
  };

  const changeInputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: (value.length > 0 && value) || null,
    }));

    const fieldError = error?.find((err) => err.field === name);

    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError([]);
    setAuthError("");

    const { data: signUpData, error: validationError } =
      signUpSchema.safeParse(formData);

    if (validationError) {
      return setError(
        validationError?.issues?.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      );
    }

    const { name, email, password, photo } = signUpData;
    setIsSubmitting(true);

    let photoURL;

    try {
      if (photo) {
        const uploadResult = await userUploadMutation.mutateAsync(photo);
        photoURL = uploadResult?.imageUrl || "";
      }
    } catch (err) {
      setIsSubmitting(false);
      return setAuthError(err?.message || "Failed to upload profile photo");
    }

    try {
      await registerUser(email, password);
    } catch (err) {
      setIsSubmitting(false);
      return setAuthError("This email is already used. Try another");
    }

    try {
      await updateUsersProfileInfo({
        photoURL: photoURL,
        displayName: name,
      });
    } catch (err) {
      setIsSubmitting(false);
      return setAuthError(err?.message || "Failed to update profile info");
    }

    setUser((prev) => ({ ...prev, displayName: name, photoURL: photoURL }));
    setIsSubmitting(false);

    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Registered",
      showConfirmButton: false,
      timer: 1000,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 md:px-8 py-10 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-redStart/5 dark:bg-primaryRed/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-redEnd/5 dark:bg-lightRed/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Identity Branding */}
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        {/* Core Glassmorphic Form Terminal */}
        <div className="bg-white border border-gray-200/60 dark:bg-slate-900/40 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-xl">
          <div className="space-y-1 mb-6 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              Create{" "}
              <span className="inline-block bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
                Account
              </span>
            </h2>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Join our secure infrastructure network
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
                Full Name
              </label>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
                <FiUser className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 transition-colors" />
                <input
                  type="text"
                  name="name"
                  onChange={changeInputHandler}
                  placeholder="John Doe"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {nameError?.message && (
                <small className="text-xs text-red-500 pt-1 pl-1">
                  {nameError.message}
                </small>
              )}
            </div>

            {/* Photo File Upload Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
                Profile Photo
              </label>

              <div className="flex items-center gap-3">
                {/* Preview Avatar */}
                <div className="relative w-12 h-12 rounded-full border-2 border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiImage className="text-gray-400 text-lg" />
                  )}
                </div>

                {/* Normal File Input Field */}
                <div className="relative flex-1 flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-3 py-2 focus-within:border-primaryRed/50 transition-all duration-300">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-transparent text-xs font-medium text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primaryRed/10 file:text-primaryRed hover:file:bg-primaryRed hover:file:text-white file:transition-colors file:cursor-pointer cursor-pointer focus:outline-none"
                  />
                </div>
              </div>

              {photoError?.message && (
                <small className="text-xs text-red-500 pt-1 pl-1">
                  {photoError.message}
                </small>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
                Email Address
              </label>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
                <FiMail className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 transition-colors" />
                <input
                  type="email"
                  name="email"
                  onChange={changeInputHandler}
                  placeholder="name@domain.com"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              {emailError?.message && (
                <small className="text-xs text-red-500 pt-1 pl-1">
                  {emailError.message}
                </small>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
                Password
              </label>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
                <FiLock className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 transition-colors" />
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={changeInputHandler}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none pr-8"
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
              {passError?.message && (
                <small className="text-xs text-red-500 pt-1 pl-1">
                  {passError.message}
                </small>
              )}
            </div>
            {/* Error Message Dashboard */}
            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold px-3 py-2 my-2 rounded-xl text-center">
                {authError}
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-redStart to-redEnd text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 shadow-md shadow-primaryRed/10 active:scale-[0.99] transition-all mt-2 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Register"}
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
          <SocialLogin setAuthError={setAuthError} />

          {/* Login Redirect Node */}
          <div className="mt-6 text-center">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                className="text-primaryRed hover:underline font-bold ml-1 tracking-normal normal-case"
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
