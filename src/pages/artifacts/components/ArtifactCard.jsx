/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useInstantLike } from "../../../hooks/artifact/useInstantLike";

// eslint-disable-next-line react/prop-types
const ArtifactCard = ({ artifact }) => {
  const { handleLike, isLiked, likesCount } = useInstantLike(artifact);

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
          <h1 className="text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white leading-snug">
            {artifact.artifactName}
          </h1>
          <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-gradient-to-r from-primaryRed/10 to-lightRed/5 border border-primaryRed/20 dark:border-white/10 text-darkRed dark:text-rosePink rounded-full">
            {artifact.artifactType}
          </span>
        </div>

        <p className="text-xs line-clamp-2 md:text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
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
      <div className="flex items-center justify-between px-6 pb-6 pt-2 relative z-10 border-t border-gray-100 dark:border-white/5">
        {/* Interaction Metric Node */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLike(artifact._id)}
            className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 p-1"
            aria-label="Like Artifact"
          >
            <FaHeart
              className={`text-base transition-colors duration-200 ${
                isLiked
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-500"
              }`}
            />
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {likesCount}
          </span>
        </div>

        <NavLink
          to={`/artifacts/${artifact.artifactName}/${artifact._id}`}
          className="w-9 h-9 rounded-xl border border-gray-200 text-gray-600 dark:border-white/10 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gradient-to-br hover:from-redStart hover:to-redEnd hover:shadow-md hover:shadow-primaryRed/25 flex items-center justify-center transition-all duration-300 cursor-pointer group/btn"
        >
          <BsArrowRight className="text-base transition-transform group-hover/btn:translate-x-0.5" />
        </NavLink>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;
