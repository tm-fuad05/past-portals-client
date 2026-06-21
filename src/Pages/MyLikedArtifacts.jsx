import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MyLikedArtifactCard from "../Cards/MyLikedArtifactCard";
import empty from "../assets/empty.jpg";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import { motion } from "framer-motion";

const MyLikedArtifacts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myLikedArtifacts, setMyLikedArtifacts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/my-liked-artifacts?email=${user?.email}`,
        );
        setMyLikedArtifacts(data);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };

    if (user?.email) {
      fetchLikedArtifacts();
    }
  }, [user?.email, axiosSecure]);

  // Orchestrated Layout Variants
  const parentContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowNode = {
    initial: { opacity: 0, y: 20, scale: 0.99 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-11/12 mx-auto px-6 py-12">
      {/* Header Stat Board */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 dark:border-white/10 pb-6 mb-10"
      >
        <div>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
            Bookmarked{" "}
            <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
              Nodes
            </span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
            Curated historical links and synchronized telemetry data
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 rounded-2xl shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase">
            Saved Core: {myLikedArtifacts.length}
          </span>
        </div>
      </motion.div>

      {/* Grid Layout & Empty States Animate Handler */}
      {loader ? (
        <Loader />
      ) : myLikedArtifacts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="my-20 text-center space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl shadow-black/[0.02]">
            <img
              src={empty}
              alt="No Bookmarks Found"
              className="w-full opacity-90 dark:opacity-75 contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-slate-950 dark:via-transparent" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-tight">
            No Data Found
          </h3>
        </motion.div>
      ) : (
        <motion.div
          variants={parentContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-4 w-full"
        >
          {myLikedArtifacts.map((likedArtifact) => (
            <motion.div key={likedArtifact?._id} variants={rowNode}>
              <MyLikedArtifactCard likedArtifact={likedArtifact} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyLikedArtifacts;
