"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { BiBell } from "react-icons/bi";
import { BiBell as BiBellIcon } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import slider2 from "../../assets/slider2.jpg";
import Swal from "sweetalert2";
import { FiLoader, FiSend } from "react-icons/fi";

const Newsletter = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);

    const isDark = document.documentElement.classList.contains("dark");
    const swalBg = isDark ? "#12131a" : "#ffffff";
    const swalColor = isDark ? "#ffffff" : "#000000";

    emailjs
      .sendForm("service_fwh8eve", "template_60bjc2k", form.current, {
        publicKey: "vuYSD7atTVsOA0PuN",
      })
      .then(
        () => {
          Swal.fire({
            title: "Transmission Successful",
            text: "You have successfully integrated into our network registry.",
            icon: "success",
            background: swalBg,
            color: swalColor,
            showConfirmButton: false,
            timer: 2000,
          });
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          Swal.fire({
            title: "Pipeline Error",
            text:
              typeof error === "string"
                ? error
                : error?.text || "Something went wrong!",
            icon: "error",
            background: swalBg,
            color: swalColor,
            showConfirmButton: false,
            timer: 2000,
          });
          setLoading(false);
        },
      );
  };

  // Framer Motion Variants Orchestration
  const shellVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
    viewport: { once: true, margin: "-100px" },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center p-4 py-20 md:p-8 overflow-hidden w-full shadow-2xl">
      {/* Dynamic Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.01 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={slider2}
          alt="Newsletter Mesh"
          className="w-full h-full object-cover contrast-[1.05]"
        />
        {/* Dynamic Darkness Vignette Filter */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-black/90 dark:from-black/95 dark:via-black/85 dark:to-black/95" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black" />
      </div>

      {/* Cyber Glassmorphism Input Frame Shell */}
      <motion.div
        variants={shellVariants}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl dark:bg-transparent dark:border-white/5 shadow-2xl rounded-3xl p-6 md:p-10"
      >
        {/* Upper Micro-Badge Matrix */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primaryRed/20 to-lightRed/10 border border-primaryRed/30 rounded-full">
            <BiBellIcon className="text-lightRed text-sm animate-bounce" />
            <span className="text-[9px] font-bold tracking-widest text-lightRed uppercase">
              Artifact Feed Pipeline
            </span>
          </div>
        </motion.div>

        {/* Header Segment */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
            Join Our{" "}
            <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-gray-300 dark:text-gray-400 text-xs font-medium leading-relaxed mt-3 max-w-md mx-auto">
            Subscribe to receive automated notifications regarding new asset
            updates, dynamic exhibitions, and live restoration logs.
          </p>
        </motion.div>

        {/* Input Pipeline Core Form */}
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          {/* Input Name Row */}
          <motion.div variants={itemVariants} className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 text-sm rounded-xl text-white placeholder:text-gray-400/70 border border-white/10 bg-white/5 dark:bg-transparent dark:border-white/10 focus:border-primaryRed dark:focus:border-primaryRed transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primaryRed/40 font-medium"
              required
            />
          </motion.div>

          {/* Input Email Row */}
          <motion.div variants={itemVariants} className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-sm rounded-xl text-white placeholder:text-gray-400/70 border border-white/10 bg-white/5 dark:bg-transparent dark:border-white/10 focus:border-primaryRed dark:focus:border-primaryRed transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primaryRed/40 font-medium"
              required
            />
          </motion.div>

          {/* Input Subject Row */}
          <motion.div variants={itemVariants} className="relative">
            <input
              type="text"
              name="subject"
              placeholder="Subject Topic"
              className="w-full px-4 py-3 text-sm rounded-xl text-white placeholder:text-gray-400/70 border border-white/10 bg-white/5 dark:bg-transparent dark:border-white/10 focus:border-primaryRed dark:focus:border-primaryRed transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primaryRed/40 font-medium"
              required
            />
          </motion.div>

          {/* Input Message Block */}
          <motion.div variants={itemVariants} className="relative">
            <textarea
              name="message"
              placeholder="Your Transmission Message..."
              className="w-full px-4 py-3 text-sm rounded-xl text-white placeholder:text-gray-400/70 border border-white/10 bg-white/5 dark:bg-transparent dark:border-white/10 focus:border-primaryRed dark:focus:border-primaryRed transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primaryRed/40 font-medium resize-none"
              rows={4}
              required
            />
          </motion.div>

          {/* Subscribing Trigger Terminal Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.015, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-redStart to-redEnd text-white py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-primaryRed/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-sm" />
                  Processing Registry...
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  Initialize Subscription
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Fine-Print Bottom Notice */}
        <motion.p
          variants={itemVariants}
          className="text-[10px] text-gray-400 text-center mt-6 font-medium tracking-wide"
        >
          Bi-monthly log broadcasts only. Zero system spam guaranteed.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Newsletter;
