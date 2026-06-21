import React from "react";
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../Components/Shared/Logo";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 px-6 lg:px-16 py-16 dark:bg-transparent dark:border-white/10">
      {/* Upper Grid Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-16 w-full max-w-[1400px] mx-auto pb-12">
        {/* Pillar 1: Services */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
            Services
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "UI Components",
              "Website Templates",
              "Icons",
              "Opacity Palette",
              "Blocks",
            ].map((item) => (
              <li
                key={item}
                className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-primaryRed dark:hover:text-lightRed cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 2: Company */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Company
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "Service",
              "Features",
              "Our Team",
              "Portfolio",
              "Blog",
              "Contact Us",
            ].map((item) => (
              <li
                key={item}
                className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-primaryRed dark:hover:text-lightRed cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 3: Media Channels */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Social Media
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "Dribbble",
              "Behance",
              "Medium",
              "Instagram",
              "Facebook",
              "Twitter",
            ].map((item) => (
              <li
                key={item}
                className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-primaryRed dark:hover:text-lightRed cursor-pointer transition-colors duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 4: Cyber Input Feed */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Join Newsletter
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Get global cluster node announcements directly to your secure feed.
          </p>

          <div className="relative flex items-center w-full">
            <input
              type="email"
              placeholder="Email address"
              className="py-3.5 pl-4 pr-12 w-full text-xs rounded-xl text-gray-900 dark:text-white border border-gray-200 bg-gray-50/30 dark:bg-transparent dark:border-white/10 focus:border-primaryRed dark:focus:border-primaryRed transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primaryRed/30 placeholder:text-gray-400/70"
            />
            <button className="absolute right-1.5 p-2 bg-gradient-to-r from-redStart to-redEnd text-white rounded-lg shadow-lg shadow-primaryRed/15 hover:opacity-95 transition-all cursor-pointer">
              <FiArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Lower Terminal Block */}
      <div className="border-t border-gray-100 dark:border-white/5 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mx-auto gap-6">
        {/* Brand Core ( Using root font with clean heavy weights ) */}
        <a href="/" className="text-xl font-bold tracking-tighter">
          <Logo />
        </a>

        {/* Legal Node */}
        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 tracking-wide text-center md:text-left">
          © {new Date().getFullYear()} PastPortals Network. All Rights Reserved.
        </p>

        {/* Icon Network Anchor Dock */}
        <div className="flex items-center gap-3">
          {[
            { icon: <CgFacebook />, link: "#" },
            { icon: <BsTwitter />, link: "#" },
            { icon: <BsInstagram />, link: "#" },
            { icon: <BsLinkedin />, link: "#" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 hover:border-transparent hover:text-white dark:hover:text-white dark:border-white/5 dark:text-gray-500 hover:bg-gradient-to-br hover:from-redStart hover:to-redEnd hover:shadow-lg hover:shadow-primaryRed/25 transition-all duration-300 cursor-pointer text-sm"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
