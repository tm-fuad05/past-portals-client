import React from "react";
import { FaMapMarkerAlt, FaTicketAlt, FaGlobeAmericas } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const MuseumInfo = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 relative z-20">
      {/* Container: Glassmorphism Shell */}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-white/70 dark:bg-transparent backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-black/5 dark:shadow-none">
        {/* Module 1: About Analytics ( Aldrich Headline ) */}
        <div className="p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaGlobeAmericas className="text-primaryRed text-sm animate-spin-slow" />
              <span className="text-[10px] font-bold tracking-widest text-darkRed dark:text-rosePink  uppercase">
                About The Cluster
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold  text-gray-900 dark:text-white leading-snug uppercase">
              The World's Leading Museum of{" "}
              <span className="text-primaryRed">History</span> & Culture.
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed mt-4">
            Unveiling ancient civilizations through a dynamic, decentralized
            archive of shared human legacy and historical assets.
          </p>
        </div>

        {/* Module 2: Egypt Museum Node */}
        <div className="p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-white/5 group hover:bg-softRedBg/40 dark:hover:bg-white/5 transition-all duration-300">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primaryRed/10 border border-primaryRed/20 flex items-center justify-center text-primaryRed text-xl shadow-sm shadow-primaryRed/10">
              <FaMapMarkerAlt />
            </div>
            <h2 className="text-lg font-bold  text-gray-900 dark:text-white uppercase tracking-tight mt-2">
              Egypt Museum Node
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">
              Flat A, 20/7, Reynolds Neck, Helenaville 08745.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold  text-primaryRed dark:text-lightRed uppercase mt-6 group-hover:translate-x-1 transition-transform"
          >
            Get Direction <FiArrowUpRight className="text-sm" />
          </a>
        </div>

        {/* Module 3: Access Validation / Membership */}
        <div className="p-8 lg:p-10 flex flex-col justify-between group hover:bg-softRedBg/40 dark:hover:bg-white/5 transition-all duration-300">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-accentRed/10 border border-accentRed/20 flex items-center justify-center text-accentRed text-xl shadow-sm shadow-accentRed/10">
              <FaTicketAlt />
            </div>
            <h2 className="text-lg font-bold  text-gray-900 dark:text-white uppercase tracking-tight mt-2">
              Admission Pipeline
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed">
              Exhibitions and core artifact registries are completely free for
              verified museum network members.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold  text-primaryRed dark:text-lightRed uppercase mt-6 group-hover:translate-x-1 transition-transform"
          >
            Become a Member <FiArrowUpRight className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MuseumInfo;
