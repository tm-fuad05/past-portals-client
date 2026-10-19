/* eslint-disable react/prop-types */
import { BsArrowRight } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useInstantLike } from "../../../hooks/artifact/useInstantLike";

const HighestArtifactCard = ({ artifact }) => {
  const { handleLike, isLiked, likesCount } = useInstantLike(artifact);

  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.08)",
      }}
      className="group relative bg-white border border-gray-200/60 dark:bg-slate-900/40  dark:border-white/10 rounded-3xl flex flex-col overflow-hidden transition-all duration-300"
    >
      {/* Visual Chamber */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={artifact?.artifactImage}
          alt={artifact?.artifactName || "Artifact"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Primary Details Matrix */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
          {artifact?.artifactName}
        </h2>

        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
          {artifact?.historicalContext}
        </p>

        <div className="w-full h-[1px] bg-gray-100 dark:bg-slate-900/40  my-1" />

        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide">
          Discovered By:{" "}
          <span className="text-gray-700 dark:text-gray-300 font-bold ml-1">
            {artifact?.discoveredBy}
          </span>
        </p>
      </div>

      {/* Control Deck Anchor Bar */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50 dark:border-white/5 bg-gray-50/40 dark:bg-transparent">
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

        {/* Dynamic Navigation Node */}
        <NavLink
          to={`/artifacts/${artifact?.artifactName}/${artifact?._id}`}
          className="w-9 h-9 rounded-xl border border-gray-200 text-gray-600 dark:border-white/10 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gradient-to-br hover:from-redStart hover:to-redEnd hover:shadow-md hover:shadow-primaryRed/25 flex items-center justify-center transition-all duration-300 cursor-pointer group/btn"
        >
          <BsArrowRight className="text-base transition-transform group-hover/btn:translate-x-0.5" />
        </NavLink>
      </div>
    </motion.div>
  );
};

export default HighestArtifactCard;
