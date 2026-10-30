/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineUser, HiOutlinePhoto } from "react-icons/hi2";
import Swal from "sweetalert2";
import { profileSchema } from "../../../validation/profile.validation";
import { useUploadUserImage } from "../../../hooks/useUploadImage";

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  updateUsersProfileInfo,
  setUser,
}) => {
  const [formData, setFormData] = useState({
    name: user?.displayName,
    photo: user?.photoURL || null,
  });
  console.log(user.photoURL);
  const [imagePreview, setImagePreview] = useState();
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userUploadMutation = useUploadUserImage();

  //Errors
  const nameError = error?.find((err) => err.field === "name");
  const photoError = error?.find((err) => err.field === "photo");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, photo: file }));

    if (photoError) setError((prev) => [...prev, (photoError.message = "")]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);

    const { data: profileData, error: validationError } =
      profileSchema.safeParse(formData);

    if (validationError) {
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );
    }

    const { name, photo } = profileData;

    let photoURL = user?.photoURL || "";
    try {
      if (photo instanceof File) {
        const uploadResult = await userUploadMutation.mutateAsync(photo);
        photoURL = uploadResult?.imageUrl;
      }
    } catch {
      setIsSubmitting(false);
      return;
    }

    try {
      await updateUsersProfileInfo({
        displayName: name.trim(),
        photoURL: photoURL.trim(),
      });

      // Update state locally for real-time reactivity
      if (setUser) {
        setUser((prev) => ({
          ...prev,
          displayName: name.trim(),
          photoURL: photoURL.trim(),
        }));
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong while updating profile.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-[#0c111c] border border-gray-200 dark:border-white/10 p-6 md:p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4 mb-6">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
                Edit Profile
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Update your archivist persona and identity
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <HiOutlineXMark className="text-xl" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Display Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
                Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <HiOutlineUser className="text-lg" />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (nameError)
                      setError((prev) => [...prev, (nameError.message = "")]);
                  }}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primaryRed focus:outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              {nameError?.message && (
                <small className="text-xs text-red-500 pt-1 pl-1">
                  {nameError.message}
                </small>
              )}
            </div>

            {/* Profile Photo File Upload Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
                Profile Photo
              </label>
              <div className="flex items-center gap-3">
                {/* Preview Avatar */}
                <div className="relative w-12 h-12 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : formData?.photo ? (
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <HiOutlinePhoto className="text-gray-400 text-xl" />
                  )}
                </div>

                {/* File Input Field */}
                <div className="relative flex-1 flex items-center bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3 py-2.5 focus-within:border-primaryRed transition-all">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-transparent text-xs font-medium text-gray-500 dark:text-gray-400 file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primaryRed/10 file:text-primaryRed hover:file:bg-primaryRed hover:file:text-white file:transition-colors file:cursor-pointer cursor-pointer focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-redStart to-redEnd text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-primaryRed/20 hover:shadow-primaryRed/40 disabled:opacity-50 cursor-pointer transition-all"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
