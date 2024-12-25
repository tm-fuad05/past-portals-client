import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto mt-7">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <figure className="relative object-cover w-full h-[600px]">
            {/* Background Image */}
            <img
              src={slider1}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            {/* Blackish Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-16 text-white gap-5">
              <div className="lg:w-3/4 md:w-3/4 text-4xl lg:text-6xl font-bold text-center md:text-left lg:text-left">
                <h1>The World's Museum</h1>
              </div>
              <p className="lg:w-3/4 md:w-3/4 text-md text-center md:text-left lg:text-left font-light">
                Explore a global collection of historical treasures. Discover
                artifacts from diverse cultures, learn about their significance,
                and contribute to the preservation of our shared past.
              </p>
            </div>
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure className="relative w-full h-[600px]">
            {/* Background Image */}
            <img
              src={slider2}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            {/* Blackish Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-16 text-white gap-5">
              <div className="lg:w-3/4 md:w-3/4 text-4xl lg:text-6xl font-bold text-center md:text-left lg:text-left">
                <h1>A Window to the Past</h1>
              </div>
              <p className="lg:w-3/4 md:w-3/4 text-md text-center md:text-left lg:text-left font-light">
                Journey through time with our vast collection of artifacts.
                Discover the stories of ancient civilizations, explore
                remarkable discoveries, and gain a deeper understanding of the
                human experience.
              </p>
            </div>
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure className="relative object-cover w-full h-[600px]">
            {/* Background Image */}
            <img
              src={slider3}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            {/* Blackish Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-16 text-white gap-5">
              <div className="lg:w-3/4 md:w-3/4 text-4xl lg:text-6xl font-bold text-center md:text-left lg:text-left">
                <h1>History in Your Hands</h1>
              </div>
              <p className="lg:w-3/4 md:w-3/4 text-md text-center md:text-left lg:text-left font-light">
                Explore, learn, and contribute to a dynamic history database.
                Discover fascinating artifacts, share your knowledge, and
                connect with other history enthusiasts.
              </p>
            </div>
          </figure>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
