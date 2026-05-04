import React, { useState } from "react";
import { Link } from "react-scroll";
import profilePic from "../assets/profile_photo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollConfig = { smooth: true, duration: 500, offset: -70 };
  const navLinks = ["home", "about", "blog", "projects", "contact"];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 w-full h-[70px] bg-black/40 backdrop-blur-md flex items-center justify-between px-8 shadow-sm z-50 font-light border-b border-white/5">
        <div className="hidden sm:flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-800/80 overflow-hidden ring-1 ring-white/10">
            <img
              src={profilePic}
              alt="Aditya Waradkar profile"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
          </div>
          <Link
            to="homeSection"
            {...scrollConfig}
            className="text-white/70 text-lg font-light tracking-wide cursor-pointer hover:text-white/90 transition-all duration-300"
          >
            aditya waradkar
          </Link>
        </div>

        <div className="sm:hidden">
          <Link
            to="homeSection"
            {...scrollConfig}
            className="text-white/70 text-base font-light tracking-wide cursor-pointer hover:text-white/90 transition-all duration-300"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Hamburger */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white/60 hover:text-white/90 text-3xl focus:outline-none transition-all duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-12 text-white/50 text-base tracking-wide">
          {navLinks.map((label) => (
            <Link
              key={label}
              to={`${label}Section`}
              {...scrollConfig}
              className="relative group cursor-pointer hover:text-white/90 transition-all duration-300"
            >
              {label}
              <span className="absolute bottom-[-2px] left-0 w-0 h-[0.5px] bg-white/30 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[260px] h-full bg-black/90 backdrop-blur-xl text-white/80 p-8 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-400 ease-out z-50 border-l border-white/5 shadow-2xl`}
        aria-hidden={!isMenuOpen}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5 text-white/40 hover:text-white/80 text-2xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col space-y-6 mt-16">
          {navLinks.map((label, index) => (
            <Link
              key={label}
              to={`${label}Section`}
              {...scrollConfig}
              onClick={toggleMenu}
              className="relative group text-base font-light tracking-wide transition-all duration-300 transform hover:translate-x-1"
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              <span className="relative z-10 text-white/40 group-hover:text-white/90 transition-all duration-300">
                {label}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-white/30 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="absolute bottom-16 left-8 right-8 h-[0.5px] bg-white/5" />
        <div className="absolute bottom-8 left-8 text-white/20 text-xs font-light tracking-wider">
          © 2025
        </div>
      </div>
    </>
  );
};

export default Navbar;
