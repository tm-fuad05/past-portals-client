import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

// React Icons
import { FaHeart } from "react-icons/fa";
import {
  HiOutlineHashtag,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const ArtifactDetails = () => {
  const { user } = useAuth();
  const eachArtifactData = useLoaderData();
  const [isLiked, setIsLiked] = useState(false);

  const {
    artifactImage,
    artifactName,
    artifactType,
    historicalContext,
    createdAt,
    discoveredAt,
    discoveredBy,
    presentLocation,
    likeCount,
  } = eachArtifactData;

  const [favCount, setFavCount] = useState(likeCount);
  const likedArtifact = { ...eachArtifactData, likedEmail: user?.email };

  const handleLike = async () => {
    if (isLiked) return;

    setIsLiked(true);
    setFavCount((prev) => prev + 1);

    try {
      const res = await axios.post(
        `https://pastportals-server.vercel.app/likedArtifacts`,
        likedArtifact,
      );
      if (res.data.insertedId) {
        toast.success(`You Liked ${artifactName}`);
      }
    } catch (error) {
      console.error(error);
      setIsLiked(false);
      setFavCount((prev) => prev - 1);
      toast.error("Failed to submit interaction");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-transparent py-16 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Aesthetic Background Blobs */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-primaryRed/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Core Showcase Card Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-xl shadow-2xl shadow-gray-200/40 dark:shadow-none overflow-hidden">
          {/* Left Block: Cinematic Image Exhibition */}
          <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] lg:min-h-full overflow-hidden group">
            <img
              src={artifactImage}
              alt={artifactName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />

            {/* Overlay Title Block on Small Screens */}
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-primaryRed px-2.5 py-1 rounded-md text-white">
                {artifactType}
              </span>
              <h1 className="text-2xl font-black text-white mt-2 tracking-tight uppercase">
                {artifactName}
              </h1>
            </div>
          </div>

          {/* Right Block: Pure Technical Information Grid */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              {/* Desktop Header Metadata */}
              <div className="hidden lg:block space-y-2 border-b border-gray-100 dark:border-white/5 pb-5">
                <span className="text-[10px] uppercase font-black tracking-widest text-primaryRed bg-primaryRed/10 border border-primaryRed/20 px-3 py-1 rounded-lg">
                  {artifactType}
                </span>
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight pt-1">
                  {artifactName}
                </h1>
              </div>

              {/* Data Node Grid Infrastructure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <HiOutlineGlobeAlt className="text-lg text-primaryRed mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Present Location
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                      {presentLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <HiOutlineUser className="text-lg text-primaryRed mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Discovered By
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                      {discoveredBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <HiOutlineCalendarDays className="text-lg text-primaryRed mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Discovered At
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                      {discoveredAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <HiOutlineMapPin className="text-lg text-primaryRed mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Epoch Origin
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                      {createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Historical Description Block */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-gray-400">
                  <HiOutlineDocumentText className="text-base text-primaryRed" />
                  <span>Historical Context</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal pl-6">
                  {historicalContext}
                </p>
              </div>
            </div>

            {/* Interaction Footer Segment */}
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6 mt-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">
                  Public Analytics
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                  Total Endorsements
                </span>
              </div>

              {/* Premium Interaction Dock */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-2 px-4 shadow-inner">
                <button
                  onClick={handleLike}
                  disabled={isLiked}
                  className={`p-2.5 rounded-xl transition-all duration-300 active:scale-95 ${
                    isLiked
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20 cursor-default"
                      : "text-gray-400 hover:text-red-500 hover:bg-gray-200/50 dark:hover:bg-white/5"
                  }`}
                  aria-label="Like Artifact"
                >
                  <FaHeart className="text-lg" />
                </button>
                <span className="font-black text-xl text-gray-800 dark:text-white min-w-[20px] text-center">
                  {favCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
