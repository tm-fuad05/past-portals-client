/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineHeart,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user, addedCount, likedCount, onEditClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-50/80 to-white/90 dark:from-[#0d131f]/80 dark:to-[#070b12]/90 border border-gray-200/80 dark:border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primaryRed/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-darkRed/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* User Identity Column */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-redStart to-redEnd rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <img
              src={
                user?.photoURL ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              }
              alt={user?.displayName || "User Avatar"}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-[#0d131f] shadow-lg"
            />
            {user?.emailVerified && (
              <span
                title="Verified Archivist"
                className="absolute -bottom-2 -right-2 p-1.5 bg-green-500 text-white rounded-xl shadow-md border-2 border-white dark:border-[#0d131f]"
              >
                <HiOutlineShieldCheck className="text-sm" />
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
                {user?.displayName || "Anonymous Explorer"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primaryRed/10 text-primaryRed border border-primaryRed/20">
                Archivist
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">
              {user?.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onEditClick}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-redStart to-redEnd text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-primaryRed/20 hover:shadow-primaryRed/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <HiOutlineSparkles className="text-sm" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Status Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200/60 dark:border-white/10">
        <Link
          to="/my-artifacts"
          className="group p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-primaryRed/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primaryRed/10 text-primaryRed">
              <HiOutlineDocumentText className="text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primaryRed transition-colors">
                {addedCount ?? 0}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                Added Artifacts
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/my-liked-artifacts"
          className="group p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-primaryRed/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500">
              <HiOutlineHeart className="text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-500 transition-colors">
                {likedCount ?? 0}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                Liked Artifacts
              </p>
            </div>
          </div>
        </Link>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <HiOutlineShieldCheck className="text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                {user?.providerData?.[0]?.providerId
                  ? user.providerData[0].providerId.replace(".com", "")
                  : "Password"}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                Auth Provider
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
