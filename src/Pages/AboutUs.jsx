"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiShield,
  FiPackage,
  FiHeart,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";

const AboutUs = () => {
  const achievements = [
    { number: "50K+", label: "Artifacts Preserved" },
    { number: "100+", label: "Expert Curators" },
    { number: "25+", label: "Years of History" },
    { number: "30+", label: "Museum Partners" },
  ];

  const values = [
    {
      icon: <FiHeart />,
      title: "Preservation",
      description:
        "Dedicated to protecting and maintaining the integrity of historical artifacts for future generations.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Accessibility",
      description:
        "Making history accessible to everyone through digital preservation and virtual exhibitions.",
    },
    {
      icon: <FiClock />,
      title: "Authenticity",
      description:
        "Ensuring the historical accuracy and authenticity of every artifact in our collection.",
    },
  ];

  // Motion Configuration Presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      {/* Premium Minimalist Hero Field */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 py-24 lg:py-32">
        {/* Decorative Glowing Orbs */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-redStart to-redEnd blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-redStart to-redEnd blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primaryRed/10 to-transparent border border-primaryRed/20 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-primaryRed uppercase">
                Our Legacy Cluster
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[1.1]">
              Preserving History, <br />
              <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
                Inspiring Tomorrow
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
              We're dedicated to the preservation and celebration of historical
              artifacts, making our cultural heritage accessible to everyone
              through cutting-edge digital preservation techniques.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3.5 bg-gradient-to-r from-redStart to-redEnd text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primaryRed/15 hover:opacity-95 transition-all cursor-pointer flex items-center gap-2"
              >
                Explore Our Collection
                <FiArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Metric Hub */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-900/80 border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl backdrop-blur-xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight uppercase">
                Our Mission
              </h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Our mission is to preserve and protect historical artifacts
                while making them accessible to a global audience. Through
                digital innovation and expert curation, we bridge the gap
                between past and present, ensuring our cultural heritage endures
                for future generations.
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primaryRed hover:text-redEnd transition-colors cursor-pointer group">
                  View Collection
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{
                    y: -4,
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                  className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl text-center lg:text-left transition-all"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primaryRed mb-1">
                    {item.number}
                  </div>
                  <div className="text-[11px] font-bold tracking-wide text-gray-400 uppercase">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Core Values Deck */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <motion.div
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight uppercase">
            Our Commitment
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
            We uphold the highest standards in artifact preservation and
            accessibility, guided by these core principles.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.06)",
              }}
              className="group relative bg-white border border-gray-200/60 p-8 rounded-2xl flex flex-col justify-between transition-shadow duration-300 dark:bg-transparent dark:border-white/10 dark:shadow-none"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-primaryRed text-base shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expertise Cluster Panel */}
      <div className="bg-gray-50/60 dark:bg-white/5 border-t border-b border-gray-100 dark:border-white/5 py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div {...fadeInUp} className="lg:col-span-4 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight uppercase">
                Our Expertise
              </h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                We offer comprehensive services in artifact preservation,
                documentation, and digital accessibility.
              </p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primaryRed hover:text-redEnd transition-colors cursor-pointer group">
                  Learn About Our Process
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: <FiAward />, title: "Expert Curation" },
                { icon: <FiShield />, title: "Preservation" },
                { icon: <FiPackage />, title: "Digital Archives" },
                { icon: <FiRefreshCw />, title: "Restoration" },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 bg-white dark:bg-transparent border border-gray-200/50 dark:border-white/10 p-5 rounded-xl transition-all duration-300 hover:border-primaryRed/30"
                >
                  <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-primaryRed text-base shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                    {service.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium End-Terminal CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden bg-gradient-to-r from-redStart to-redEnd rounded-3xl p-8 md:p-12 shadow-xl shadow-primaryRed/15"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                Discover Our Collection
              </h2>
              <p className="text-xs md:text-sm text-red-100 font-medium">
                Experience history through our carefully curated artifacts
                registry.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white text-primaryRed text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-red-50 transition-all cursor-pointer shrink-0"
            >
              Start Exploring
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
