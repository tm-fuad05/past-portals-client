import React, { useContext, useEffect, useState } from "react";
import Loader from "./Shared/Loader";

// react icons
("react-icons/io");
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";

import { IoIosArrowUp } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast } from "react-toastify";
// Toastify
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  console.log(scrolled);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { user, signOutUser, loader } = useContext(AuthContext);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navMenu = (
    <>
      <NavLink to="/">
        <li className="px-3 py-2 hover:bg-gray-100 hover:rounded-md duration-300">
          Home
        </li>
      </NavLink>
      <NavLink to="/all-artifacts">
        <li className="px-3 py-2 hover:bg-gray-100 hover:rounded-md duration-300">
          All Artifacts
        </li>
      </NavLink>
      {user && (
        <NavLink to="/add-artifacts">
          <li className="px-3 py-2 hover:bg-gray-100 hover:rounded-md duration-300">
            Add Artifacts
          </li>
        </NavLink>
      )}
      <NavLink to="/about-us">
        <li className="px-3 py-2 hover:bg-gray-100 hover:rounded-md duration-300">
          About Us
        </li>
      </NavLink>
    </>
  );

  const logOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully Signed out",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => toast.warn(error));
  };

  return (
    <div
      className={`shadow-sm sticky top-0 z-50 ${
        scrolled ? "bg-black/80" : "bg-white"
      } `}
    >
      <nav className="flex items-center justify-between px-8 mx-auto relative py-2 md:py-4">
        <a
          href="/"
          className={`text-xl md:text-2xl font-bold font-aldrich ${
            scrolled ? "text-white" : "text-black"
          }`}
        >
          <span className="text-red-600">P</span>asts
          <span className="text-red-600">P</span>ortals
        </a>
        <ul
          className={`items-center gap-[10px] text-[1rem] text-[#424242] lg:flex hidden ${
            scrolled ? "text-white" : "text-black"
          }`}
        >
          {navMenu}
        </ul>

        <div className="flex items-center gap-[15px]">
          {user && user?.email ? (
            <div className="flex items-center gap-[15px]">
              <div className="dropdown dropdown-end dropdown-hover">
                {/* Profile photo */}
                <div
                  tabIndex={0}
                  role="button"
                  className="hover:bg-gray-200 hover:rounded-full duration-200"
                >
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-[40px] h-[40px] rounded-full object-cover p-1"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow"
                >
                  <li className="pt-2 pl-2 font-medium">{user?.displayName}</li>
                  <li>
                    <div className="mt-3 border-t border-gray-200 pt-[5px]">
                      <button
                        onClick={logOut}
                        className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 "
                      >
                        <TbLogout2 />
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              {/* My profile */}
              <div
                className="flex items-center gap-[10px] cursor-pointer relative z-20"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <h1
                  className={`text-[1rem] font-[400] text-gray-600 hidden md:block ${
                    scrolled ? "text-white" : "text-black"
                  }`}
                >
                  My Profile
                </h1>

                <div
                  className={`${
                    accountMenuOpen ? "t z-[1]" : "hidden"
                  } bg-white w-max rounded-md shadow-lg absolute top-[45px] right-0 p-[10px] flex flex-col  gap-[5px] `}
                >
                  <NavLink to="/my-artifacts">
                    {" "}
                    <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-100">
                      My Artifacts
                    </p>
                  </NavLink>
                  <NavLink to="/my-liked-artifacts">
                    <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-100">
                      Liked Artifacts
                    </p>
                  </NavLink>
                </div>

                <IoIosArrowUp
                  className={` ${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } ${
                    scrolled ? "text-white" : "text-black"
                  } transition-all duration-300 text-gray-600 sm:block`}
                />
              </div>
            </div>
          ) : loader ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Link
              to="/auth/sign-in"
              className="btn border-none text-white bg-red-600 duration-500 focus:outline-none"
            >
              Login
            </Link>
          )}

          <CiMenuFries
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`text-[1.8rem] text-[#424242]c cursor-pointer lg:hidden flex ${
              scrolled ? "text-white" : "text-black"
            }`}
          />
        </div>

        <aside
          className={` ${
            mobileSidebarOpen ? "translate-x-0" : "translate-x-[2000px]"
          } lg:hidden bg-white shadow-xl p-4 absolute right-0 md:w-[300px] w-full rounded-md z-20 top-[56px] md:top-[75px] transition duration-300`}
        >
          <ul className="text-center gap-[20px] text-[1rem] text-gray-600 block">
            {navMenu}
          </ul>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
