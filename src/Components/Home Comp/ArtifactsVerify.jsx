"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMicroscope, FaDna, FaFlask, FaNetworkWired } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const ArtifactsVerify = () => {
  const verifySteps = [
    {
      id: 1,
      icon: <FaMicroscope />,
      text: "Fast, effective testing of medicines and historical compounds.",
    },
    {
      id: 2,
      icon: <FaDna />,
      text: "Artificial Intelligence interprets and delivers initial findings immediately.",
    },
    {
      id: 3,
      icon: <FaFlask />,
      text: "Scientifically validated results recorded on blockchain guide risk mitigation actions.",
    },
    {
      id: 4,
      icon: <FaNetworkWired />,
      text: "Deployed seamlessly at any nodal point in the decentralized supply chain.",
    },
  ];

  // Motion Architecture Setup
  const leftWingFade = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const gridContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" },
  };

  const cardNodeFade = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <div className="w-full bg-softRedBg dark:bg-slate-950 py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[70vh]">
        {/* Left Side: Headline Hub */}
        <motion.div
          {...leftWingFade}
          className="w-full lg:w-2/5 text-center lg:text-left space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primaryRed/10 to-lightRed/5 border border-primaryRed/20 dark:border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-ping" />
            <span className="text-[10px] font-bold tracking-widest text-darkRed dark:text-rosePink uppercase">
              The Architecture
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
            Artifacts{" "}
            <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent block md:inline">
              Verify
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            A powerful combination of rigorous chemical analysis,
            decentralization, and artificial intelligence ensuring absolute
            historical integrity.
          </p>
        </motion.div>

        {/* Right Side: Cyber-Glass Grid Shell */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <motion.div
            variants={gridContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
          >
            {verifySteps.map((step) => (
              <motion.div
                key={step.id}
                variants={cardNodeFade}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.05)",
                }}
                className="group relative overflow-hidden p-6 md:p-8 rounded-3xl transition-all duration-300 bg-white border border-gray-200/50 dark:bg-transparent dark:border-white/10"
              >
                {/* Background Glow Node on Hover */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-redStart/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon Chamber */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primaryRed/10 to-lightRed/5 text-primaryRed text-xl border border-primaryRed/20 flex items-center justify-center transition-all duration-300 group-hover:from-redStart group-hover:to-redEnd group-hover:text-white group-hover:scale-110 shadow-sm shadow-primaryRed/5">
                  {step.icon}
                </div>

                {/* Card Context */}
                <h3 className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-medium leading-relaxed mt-5 transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
                  {step.text}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Integration Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-redStart to-redEnd text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primaryRed/20 hover:opacity-95 transition-all cursor-pointer group"
            >
              Learn More Protocols
              <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsVerify;
