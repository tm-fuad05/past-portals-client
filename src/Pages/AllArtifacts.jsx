"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ArtifactCard from "../Cards/ArtifactCard";
import empty from "../assets/empty.jpg";
import Loader from "../Components/Shared/Loader";

const AllArtifacts = () => {
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchaAllArtifacts = async () => {
      // লোডার ট্র্যাকিং বজায় রাখার জন্য সার্চ করার সাথে সাথে ইনিশিয়াল ট্র্রিগার দেওয়া যেতে পারে
      const { data } = await axios.get(
        `https://pastportals-server.vercel.app/artifacts?search=${search}`,
      );
      setAllArtifacts(data);
      setLoader(false);
    };
    fetchaAllArtifacts();
  }, [search]);

  // Orchestrated Layout Variants
  const parentContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardNode = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Search Terminal Core */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl mx-auto mb-14"
      >
        <div className="relative flex items-center bg-white border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-100/50 dark:bg-white/5 dark:border-white/10 dark:shadow-none focus-within:border-primaryRed/60 dark:focus-within:border-primaryRed/60  group overflow-hidden px-4 py-3.5">
          <FiSearch className="text-gray-400 group-focus-within:text-primaryRed text-lg transition-colors mr-3" />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
            placeholder="Search historic artifacts by code or metadata..."
          />
        </div>
      </motion.div>

      {/* Header Stat Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 dark:border-white/10 pb-6 mb-10"
      >
        <div>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
            Registry{" "}
            <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
              Index
            </span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
            Deep historical archives verified node architecture
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 rounded-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase">
            Total Available: {allArtifacts.length}
          </span>
        </div>
      </motion.div>

      {/* Grid Interface / Empty State Animate Presence */}

      {loader ? (
        <Loader />
      ) : allArtifacts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto my-20 text-center space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl shadow-black/[0.02]">
            <img
              src={empty}
              alt="No Nodes Registered"
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
          key={search}
          variants={parentContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {allArtifacts.map((artifact) => (
            <motion.div key={artifact?._id || artifact?.id} variants={cardNode}>
              <ArtifactCard artifact={artifact} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllArtifacts;
