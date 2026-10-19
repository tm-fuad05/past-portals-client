import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useMyAddedArtifacts } from "../../hooks/my-artifacts/useMyAddedArtifact";
import Loader from "../../components/shared/Loader";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import EditProfileModal from "./components/EditProfileModal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { useMyLikedArtifacts } from "../../hooks/my-artifacts/useMyLikedArtifacts";

const Profile = () => {
  const { user, loader, updateUsersProfileInfo, setUser } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: myArtifacts, isPending: isMyArtifactsLoading } =
    useMyAddedArtifacts();

  const { data: myLikedArtifacts, isPending } = useMyLikedArtifacts();

  if (loader || isMyArtifactsLoading || isPending) {
    return <Loader />;
  }

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-12">
      {/* Top Breadcrumb & Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 dark:border-white/10 pb-6 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
            Archivist{" "}
            <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
            Curator identity terminal & collection control overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/add-artifact"
            className="px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 dark:bg-white/5 dark:border-white/10 hover:border-primaryRed text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:text-primaryRed"
          >
            <HiOutlinePlus className="text-sm" />
            New Artifact
          </Link>
          <Link
            to="/artifacts"
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-redStart to-redEnd text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-primaryRed/20 hover:shadow-primaryRed/40 transition-all"
          >
            Explore
            <HiOutlineArrowRight className="text-sm" />
          </Link>
        </div>
      </motion.div>

      {/* Main Content Layout */}
      <div className="space-y-8">
        {/* Profile Card & Header with Live Counts */}
        <ProfileHeader
          user={user}
          addedCount={myArtifacts?.length ?? 0}
          likedCount={myLikedArtifacts?.length ?? 0}
          onEditClick={() => setIsEditOpen(true)}
        />

        {/* Credential Dossier / Metadata Details */}
        <ProfileDetails user={user} />

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link
            to="/my-artifacts"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-[#0d131f] dark:to-[#090d15] border border-gray-200/80 dark:border-white/10 p-6 hover:border-primaryRed/50 transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-2xl bg-primaryRed/10 text-primaryRed">
                <HiOutlineSparkles className="text-xl" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primaryRed group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Manage Vault →
              </span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white">
              My Registered Artifacts
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Review, update, or remove relics you have contributed to the
              archive. Currently maintaining {myArtifacts?.length ?? 0}{" "}
              registered entries.
            </p>
          </Link>

          <Link
            to="/my-liked-artifacts"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-[#0d131f] dark:to-[#090d15] border border-gray-200/80 dark:border-white/10 p-6 hover:border-pink-500/50 transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-2xl bg-pink-500/10 text-pink-500">
                <HiOutlineSparkles className="text-xl" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Collection →
              </span>
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white">
              Bookmarked Liked Relics
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Explore your personal favorites and historical discoveries curated
              across the community. {myLikedArtifacts?.length ?? 0} relics
              saved.
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        updateUsersProfileInfo={updateUsersProfileInfo}
        setUser={setUser}
      />
    </div>
  );
};

export default Profile;
