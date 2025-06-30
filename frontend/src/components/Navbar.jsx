import React, { useState } from "react";
import { Link } from "react-scroll";
import profilePic from "../assets/Profile_pic.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollConfig = {
    smooth: true,
    duration: 500,
    offset: -70, // <-- No offset, since navbar overlaps on top
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[70px] bg-black/60 backdrop-blur-sm flex items-center justify-between px-8 shadow-md z-50 font-light">
        {/* Left Section */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <img
              src={profilePic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Link
            to="homeSection"
            {...scrollConfig}
            className="text-white sm:text-xl text-3xl font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Hamburger */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Name */}
        <div className="sm:hidden">
          <Link
            to="homeSection"
            {...scrollConfig}
            className="text-white text-base sm:text-xl font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-14 text-white sm:text-xl tracking-wide">
          {["home", "about", "projects", "contact"].map((label, i) => (
            <Link
              key={label}
              to={`${label}Section`}
              {...scrollConfig}
              className="relative group cursor-pointer"
            >
              {label}
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-black text-white p-6 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col space-y-6 mt-10">
          {["home", "about", "projects", "contact"].map((label) => (
            <Link
              key={label}
              to={`${label}Section`}
              {...scrollConfig}
              onClick={toggleMenu}
              className="text-base sm:text-xl cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
