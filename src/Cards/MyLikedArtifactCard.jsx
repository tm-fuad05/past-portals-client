import React from "react";
import {
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineClock,
} from "react-icons/hi2";

const MyLikedArtifactCard = ({ likedArtifact }) => {
  const { artifactImage, artifactName, artifactType, discoveredBy, createdAt } =
    likedArtifact;

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 p-4 sm:p-5 rounded-3xl border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-slate-900/40  backdrop-blur-xl shadow-lg shadow-gray-200/30 dark:shadow-none group hover:border-primaryRed/30 dark:hover:border-primaryRed/30 overflow-hidden">
      {/* Image Thumbnail Exhibition */}
      <div className="w-full md:w-3/12 h-52 md:h-36 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-900 shrink-0">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out text-gray-900 dark:text-white"
          src={artifactImage}
          alt={artifactName}
        />
      </div>

      {/* Structured Technical Metadata Info */}
      <div className="flex flex-col justify-center flex-grow space-y-3.5 py-1">
        <div>
          {/* Badge & Title Stack */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] uppercase font-black tracking-widest text-primaryRed bg-primaryRed/5 dark:bg-primaryRed/10 border border-primaryRed/20 px-2 py-0.5 rounded-md">
              {artifactType}
            </span>
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight line-clamp-1">
            {artifactName}
          </h3>
        </div>

        {/* Info Matrix List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <HiOutlineUser className="text-primaryRed text-base shrink-0" />
            <span className="text-gray-400 font-bold uppercase tracking-wider min-w-[85px]">
              Discoverer:
            </span>
            <span className="truncate max-w-[150px] sm:max-w-none">
              {discoveredBy}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineClock className="text-primaryRed text-base shrink-0" />
            <span className="text-gray-400 font-bold uppercase tracking-wider min-w-[85px]">
              Origin Era:
            </span>
            <span className="truncate">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLikedArtifactCard;
