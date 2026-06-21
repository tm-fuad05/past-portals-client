"use client";
import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const ArtifactCard = ({ artifact }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.08)",
      }}
      className="h-full group relative bg-white border border-gray-200/60 dark:bg-slate-900/40  dark:border-white/10 rounded-3xl flex flex-col overflow-hidden transition-all duration-300"
    >
      {/* Dynamic Background Glow Node on Hover */}
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-redStart/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container with Zoom Architecture */}
      <div className="w-full h-80 md:h-72 overflow-hidden relative">
        <img
          src={artifact.artifactImage}
          alt={artifact.artifactName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Core Context Payload */}
      <div className="p-6 space-y-4 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white leading-snug">
            {artifact.artifactName}
          </h1>
          <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-gradient-to-r from-primaryRed/10 to-lightRed/5 border border-primaryRed/20 dark:border-white/10 text-darkRed dark:text-rosePink rounded-full">
            {artifact.artifactType}
          </span>
        </div>

        <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
          {artifact.historicalContext}
        </p>

        <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
            <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
              Discovered By:
            </span>{" "}
            {artifact.discoveredBy}
          </p>
        </div>
      </div>

      {/* Action Controller Terminal */}
      <div className="flex justify-end px-4 pb-4 relative z-10">
        <NavLink
          to={`/artifact/${artifact.artifactName}/${artifact._id}`}
          className="p-3 bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 rounded-2xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-redStart group-hover:to-redEnd group-hover:border-transparent group"
        >
          <BsArrowRight className="text-xl text-darkRed dark:text-rosePink group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
        </NavLink>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;
