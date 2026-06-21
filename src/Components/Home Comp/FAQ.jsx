"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { RiQuestionnaireLine } from "react-icons/ri";

const FAQ = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState(0);

  const accordingData = [
    {
      title: "What is the purpose of this website?",
      description:
        "This website is dedicated to exploring the history of ancient Rome. We strive to offer in-depth articles and interactive timelines to our visitors.",
    },
    {
      title: "Who is this website for?",
      description:
        "This website is designed for history buffs who are passionate about ancient Rome. Whether you're a seasoned expert or just starting your journey, we have something for everyone.",
    },
    {
      title: "What makes this website unique?",
      description:
        "Our website features exclusive interviews with leading historians. We aim to provide a unique and enriching experience for all our visitors.",
    },
    {
      title: "How often is this website updated?",
      description:
        "We are committed to providing fresh and engaging content. You can expect regular updates, including new blog posts every week. We strive to keep you informed and inspired with the latest information and insights.",
    },
    {
      title: "What is the significance of color theory in design?",
      description:
        "Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs.",
    },
  ];

  const handleClick = (index) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  // Entrance Variants Setup
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-32 overflow-hidden">
      {/* Section Headline Module */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:items-start space-y-3 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primaryRed/10 to-lightRed/5 border border-primaryRed/20 dark:border-white/10 rounded-full">
          <RiQuestionnaireLine className="text-primaryRed text-sm" />
          <span className="text-[10px] font-bold tracking-widest text-darkRed dark:text-rosePink uppercase">
            FAQ Registry
          </span>
        </div>
        <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
          Additional{" "}
          <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
            Details
          </span>
        </h3>
      </motion.div>

      {/* Accordion Interface Container */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col bg-white border border-gray-200/60 rounded-3xl p-4 md:p-6 shadow-xl shadow-black/5 dark:bg-transparent dark:border-white/10 dark:shadow-none"
      >
        {accordingData.map((according, index) => {
          const isOpen = isAccordingOpen === index;

          return (
            <motion.article
              key={index}
              variants={itemVariants}
              className="py-4 border-b border-gray-100 last:border-none dark:border-white/5"
            >
              {/* Accordion Trigger Header */}
              <div
                className="flex gap-4 cursor-pointer items-center justify-between w-full group py-1"
                onClick={() => handleClick(index)}
              >
                <h2
                  className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                    isOpen
                      ? "text-primaryRed"
                      : "text-gray-800 dark:text-gray-200 group-hover:text-primaryRed"
                  }`}
                >
                  {according.title}
                </h2>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-redStart to-redEnd border-transparent text-white shadow-md shadow-primaryRed/20"
                      : "bg-gray-50 border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 group-hover:border-primaryRed/50 group-hover:text-primaryRed"
                  }`}
                >
                  <FaChevronDown className="text-xs" />
                </motion.div>
              </div>

              {/* Accordion Smooth Height Content Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1">
                      <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-4xl pl-1 pr-6">
                        {according.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FAQ;
