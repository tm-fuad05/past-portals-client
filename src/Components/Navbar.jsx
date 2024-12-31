import React, { useContext, useState } from "react";

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
  const { user, signOutUser } = useContext(AuthContext);

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
      <NavLink to="/add-artifacts">
        <li className="px-3 py-2 hover:bg-gray-100 hover:rounded-md duration-300">
          Add Artifacts
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
    <div className="shadow-sm">
      <nav className="flex items-center justify-between w-11/12 mx-auto relative py-2 md:py-4 ">
        <a href="/" className="text-2xl font-bold font-aldrich">
          <span className="text-red-600">P</span>asts
          <span className="text-red-600">P</span>ortals
        </a>
        <ul className="items-center gap-[10px] text-[1rem] text-[#424242] lg:flex hidden">
          {navMenu}
        </ul>

        <div className="flex items-center gap-[15px]">
          {user && user?.email ? (
            <div className="flex items-center gap-[15px]">
              <div className="dropdown dropdown-end dropdown-hover">
                {/* Profile photo */}
                <div tabIndex={0} role="button" className="hover:opacity-60">
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-[35px] h-[35px] rounded-full object-cover"
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
                <h1 className="text-[1rem] font-[400] text-gray-600 sm:block ">
                  My Profile
                </h1>

                <div
                  className={`${
                    accountMenuOpen
                      ? "translate-y-0 opacity-100 z-[1]"
                      : "translate-y-[10px] opacity-0 z-[-1]"
                  } bg-white w-max rounded-md shadow-lg absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
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
                  className={`${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } transition-all duration-300 text-gray-600 sm:block`}
                />
              </div>
            </div>
          ) : (
            <Link
              to="/auth/sign-in"
              className="btn text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 hover:scale-105 duration-500 focus:outline-none"
            >
              Login
            </Link>
          )}

          <CiMenuFries
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="text-[1.8rem] text-[#424242]c cursor-pointer lg:hidden flex"
          />
        </div>

        <aside
          className={` ${
            mobileSidebarOpen
              ? "translate-x-0 opacity-100 z-20"
              : "translate-x-[200px] opacity-0 z-[-1]"
          } lg:hidden bg-white shadow-lg p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
        >
          <ul className="text-start gap-[20px] text-[1rem] text-gray-600 block">
            {navMenu}
          </ul>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
