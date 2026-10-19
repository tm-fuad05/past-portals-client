import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineUser, HiOutlinePhoto } from "react-icons/hi2";
import Swal from "sweetalert2";

const EditProfileModal = ({ isOpen, onClose, user, updateUsersProfileInfo, setUser }) => {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUsersProfileInfo({
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
      });

      // Update state locally for real-time reactivity
      if (setUser) {
        setUser((prev) => ({
          ...prev,
          displayName: displayName.trim(),
          photoURL: photoURL.trim(),
        }));
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been successfully synced.",
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
                Archivist Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <HiOutlineUser className="text-lg" />
                </span>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primaryRed focus:outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5">
                Avatar Image URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <HiOutlinePhoto className="text-lg" />
                </span>
                <input
                  type="url"
                  required
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primaryRed focus:outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Photo Preview */}
            {photoURL && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <img
                  src={photoURL}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-primaryRed/30"
                />
                <div className="text-xs">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Live Preview
                  </p>
                  <p className="text-gray-400 truncate max-w-[220px]">
                    {photoURL}
                  </p>
                </div>
              </div>
            )}

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
                {isSubmitting ? "Syncing..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
