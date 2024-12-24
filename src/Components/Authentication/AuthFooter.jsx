import React from "react";

// react icons
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";

const AuthFooter = () => {
  return (
    <footer className="bg-white boxShadow rounded-xl w-full p-6 sm:p-9">
      <div className="flex justify-between gap-[30px] flex-col sm:flex-row flex-wrap w-full">
        <div className="w-full sm:w-[25%] ">
          <img
            src="https://i.ibb.co/ZHYQ04D/footer-logo.png"
            alt="logo"
            className="w-[150px] mb-[20px]"
          />
          <div className="flex flex-col gap-[20px] text-primary">
            <span>
              <p className="text-[0.9rem] text-black flex items-center gap-[8px] cursor-pointer">
                <IoLocationOutline className="text-[1.2rem]" />
                Kulaura, Moulvibazar, Sylhet
              </p>
            </span>
            <span>
              <a className="text-[0.9rem] text-black  flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                <MdOutlineEmail className="text-[1.1rem]" />
                zenuilibrary@gmail.com
              </a>
            </span>
            <span>
              <a className="text-[0.9rem] text-black  flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                <MdOutlineLocalPhone className="text-[1.1rem]" />
                +8801305282768
              </a>
            </span>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1.2rem] font-semibold text-text mb-2">
            Services
          </h3>
          <div className="flex text-black flex-col gap-[10px]">
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              UI Components
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Website Templates
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Icons
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Opacity Palette
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Blocks
            </p>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1.2rem] font-semibold text-text mb-2">
            Company
          </h3>
          <div className="flex text-black flex-col gap-[10px]">
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Service
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Features
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Our Team
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Portfolio
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Blog
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Contact Us
            </p>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1.2rem] font-semibold text-text mb-2">
            Our Social Media
          </h3>
          <div className="flex text-black flex-col gap-[10px]">
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Dribbble
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Behance
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Medium
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Instagram
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Facebook
            </p>
            <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
              Twitter
            </p>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-[1.2rem] font-semibold text-text mb-2">
            Join a Newsletter
          </h3>
          <div className="flex gap-[2px] w-full md:w-[40%] flex-col  relative">
            <label className="text-[0.9rem]">Your Email</label>
            <input
              type="email"
              className="py-3 px-4 pr-[90px] w-full rounded-md border border-primary outline-none"
              placeholder="Email address"
            />

            <button className="px-4 h-[67%] rounded-r-md bg-primary text-white absolute top-[24px] right-0">
              Submit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
