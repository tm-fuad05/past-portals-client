"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slidesData = [
    {
      id: 1,
      image: slider1,
      tag: "GLOBAL HERITAGE CLUSTER",
      titleStart: "The World's",
      titleHighlight: "Museum",
      description:
        "Explore a global collection of historical treasures. Discover artifacts from diverse cultures, learn about their significance, and contribute to the preservation of our shared past.",
    },
    {
      id: 2,
      image: slider2,
      tag: "CHRONO PORTAL INDEX",
      titleStart: "A Window to the",
      titleHighlight: "Past",
      description:
        "Journey through time with our vast collection of artifacts. Discover the stories of ancient civilizations, explore remarkable discoveries, and gain a deeper understanding of the human experience.",
    },
    {
      id: 3,
      image: slider3,
      tag: "DYNAMIC REGISTRY METRIC",
      titleStart: "History in Your",
      titleHighlight: "Hands",
      description:
        "Explore, learn, and contribute to a dynamic history database. Discover fascinating artifacts, share your knowledge, and connect with other history enthusiasts.",
    },
  ];

  // Micro-Animations Config Matrix
  const contentContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const textNodeFade = {
    initial: { opacity: 0, x: -40 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-4 overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper rounded-[2.5rem] overflow-hidden shadow-2xl relative group border-2 border-white dark:border-white/10"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[680px] flex items-center overflow-hidden">
              {/* Background Layer with Deep Cinematic Vignette */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.titleHighlight}
                  className="w-full h-full object-cover scale-102 animate-[zoom_20s_infinite_alternate]"
                />
                {/* Cinema Mask Grading */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent dark:from-black/95 dark:via-black/60 dark:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              </div>

              {/* Seamless Full-Screen Floating Content */}
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    variants={contentContainer}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="relative z-10 w-full max-w-3xl ml-6 md:ml-20 mr-6 space-y-5 text-left"
                  >
                    {/* Cyber Minimalist Tag */}
                    <motion.div
                      variants={textNodeFade}
                      className="inline-flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-primaryRed shadow-[0_0_8px_#ef4444]" />
                      <span className="text-[11px] font-bold tracking-[0.2em] text-gray-300 dark:text-gray-400 uppercase">
                        {slide.tag}
                      </span>
                    </motion.div>

                    {/* Main Heading Matrix */}
                    <motion.h1
                      variants={textNodeFade}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter uppercase"
                    >
                      {slide.titleStart}{" "}
                      <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent block mt-1">
                        {slide.titleHighlight}
                      </span>
                    </motion.h1>

                    {/* Subtext Feed */}
                    <motion.p
                      variants={textNodeFade}
                      className="text-gray-300 dark:text-gray-400 text-xs md:text-sm lg:text-base font-medium leading-relaxed max-w-xl pt-2"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Minimal Control Panel Actions */}
                    <motion.div
                      variants={textNodeFade}
                      className="pt-4 flex flex-wrap gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                        whileTap={{ scale: 0.98 }}
                        className="px-7 py-3.5 bg-gradient-to-r from-redStart to-redEnd text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primaryRed/20 transition-all cursor-pointer"
                      >
                        Explore Registry
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          bg: "rgba(255, 255, 255, 0.12)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="px-7 py-3.5 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer backdrop-blur-md"
                      >
                        Contributions
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Progress Timeline Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                <div className="h-full bg-gradient-to-r from-redStart to-redEnd w-full origin-left animate-[progress_5000ms_linear_infinite]" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
