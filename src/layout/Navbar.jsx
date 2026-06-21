import React, { useContext, useEffect, useRef, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosArrowDown, IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../Components/Shared/Logo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [switchTheme, setSwitchTheme] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { user, signOutUser, loader } = useContext(AuthContext);

  useEffect(() => {
    const html = document.documentElement;
    if (switchTheme) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [switchTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const logOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signed Out Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
      })
      .catch((error) => toast.warn(error?.message || error));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Artifacts", path: "/all-artifacts" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-white dark:bg-transparent border-b border-gray-100/50 dark:border-white/5 backdrop-blur-xl shadow-sm"
          : "bg-white/90 dark:bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-4 relative">
        {/* Brand Core Identity */}
        <a
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tighter select-none"
        >
          <Logo />
        </a>

        {/* Center Desktop Navigation Hub */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100  dark:bg-gray-900/50 p-1.5 rounded-2xl border border-gray-200 dark:border-white/5">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl ${
                  isActive
                    ? "bg-white dark:bg-white/10 text-primaryRed shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/add-artifacts"
              className={({ isActive }) =>
                `px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl  ${
                  isActive
                    ? "bg-white dark:bg-white/10 text-primaryRed shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              Add Artifacts
            </NavLink>
          )}
        </div>

        {/* Right Action Terminal Control Panel */}
        <div className="flex items-center gap-3">
          {/* Theme Dynamic Controller Button */}
          <button
            className="hidden md:block p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-gray-100 hover:border-primaryRed hover:text-primaryRed dark:border-white/5 dark:bg-white/5 dark:text-gray-400 dark:hover:border-primaryRed dark:hover:text-primaryRed  cursor-pointer text-sm"
            onClick={() => setSwitchTheme(!switchTheme)}
          >
            {switchTheme ? <IoMdSunny /> : <FaMoon />}
          </button>
          {/* User Active Account Panel */}
          {user && user?.email ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Avatar Trigger Button */}
              <div
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl cursor-pointer select-none group  hover:border-primaryRed/30"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <img
                  src={user?.photoURL}
                  alt="Avatar"
                  className="w-7 h-7 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800"
                />
                <IoIosArrowDown
                  className={`text-xs text-gray-500 dark:text-white transition-transform duration-300 ${
                    accountMenuOpen
                      ? "rotate-180 text-primaryRed dark:text-primaryRed"
                      : "rotate-0"
                  }`}
                />
              </div>

              {/* Account Floating Flyout Deck */}
              <div
                className={`absolute top-[60px] right-0 bg-white/95 border border-gray-100 rounded-2xl w-56 p-2 shadow-2xl backdrop-blur-xl dark:bg-[#060911] dark:border-white/10 flex flex-col gap-1  origin-top-right ${
                  accountMenuOpen
                    ? "scale-100 opacity-100 z-50"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="px-3 py-2 border-b border-gray-300 dark:border-white/5 mb-1 flex gap-5 items-center">
                  <p className="text-xs font-medium text-gray-800 dark:text-white truncate mt-0.5">
                    {user?.displayName}
                  </p>
                  {/* Theme Dynamic Controller Button */}
                  <button
                    className="block md:hidden p-2.5 rounded-xl border border-gray-200 text-gray-600 bg-gray-100 hover:border-primaryRed hover:text-primaryRed dark:border-white/5 dark:bg-white/5 dark:text-gray-400 dark:hover:border-primaryRed dark:hover:text-primaryRed  cursor-pointer text-sm w-fit mx-auto"
                    onClick={() => setSwitchTheme(!switchTheme)}
                  >
                    {switchTheme ? <IoMdSunny /> : <FaMoon />}
                  </button>
                </div>

                <NavLink
                  to="/my-artifacts"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <p className="flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-primaryRed hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    My Artifacts
                  </p>
                </NavLink>

                <NavLink
                  to="/my-liked-artifacts"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <p className="flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-primaryRed hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    Liked Core
                  </p>
                </NavLink>

                <button
                  onClick={logOut}
                  className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 mt-1 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border-t border-gray-300 dark:border-white/5 transition-colors cursor-pointer"
                >
                  <TbLogout2 className="text-sm" />
                  Logout Session
                </button>
              </div>
            </div>
          ) : loader ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="loading loading-spinner loading-xs text-primaryRed"></span>
            </div>
          ) : (
            <Link
              to="/auth/sign-in"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-redStart to-redEnd rounded-xl shadow-lg shadow-primaryRed/15 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            >
              Login
            </Link>
          )}

          {/* Mobile Sidebar Hamburger Menu Trigger */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-gray-700 dark:text-gray-300 cursor-pointer lg:hidden flex transition-transform active:scale-95"
          >
            <HiMenuAlt3 className="text-2xl" />
          </button>
        </div>

        {/* Premium Mobile Right Drawer overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
            mobileSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileSidebarOpen(false)}
        />

        {/* Premium Mobile Right Drawer Side Deck */}
        <aside
          className={`fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-white/10 p-6 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
            mobileSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-8">
            {/* Drawer Close Terminal */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Navigation
              </span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg border border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400"
              >
                <IoCloseOutline className="text-xl" />
              </button>
            </div>

            {/* Mobile Nav Menu Stack */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                      isActive
                        ? "text-primaryRed bg-primaryRed/5 dark:bg-primaryRed/10"
                        : "text-gray-600 dark:text-gray-400 hover:text-primaryRed"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to="/add-artifacts"
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                      isActive
                        ? "text-primaryRed bg-primaryRed/5 dark:bg-primaryRed/10"
                        : "text-gray-600 dark:text-gray-400 hover:text-primaryRed"
                    }`
                  }
                >
                  Add Artifacts
                </NavLink>
              )}
            </div>
          </div>

          {/* Drawer Fine Print Bottom */}
          <div className="text-[10px] text-gray-400 tracking-wide text-center">
            PastPortals Control Cluster Node
          </div>
        </aside>
      </nav>
    </div>
  );
};

export default Navbar;
