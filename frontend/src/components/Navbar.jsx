import React, { useState } from "react";
import { Link } from "react-scroll";
import profilePic from "../assets/Profile_pic.jpg"; // Import profile picture

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollConfig = {
    smooth: true,
    duration: 500,
    offset: -90, // To account for fixed navbar height
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full h-[90px] bg-black flex items-center justify-between px-8 shadow-md z-50 font-light">
        {/* Left Section: Profile + Name (hidden on mobile) */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <img
              src={profilePic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Link
            to="heroSection"
            {...scrollConfig}
            className="text-white sm:text-xl text-3xl font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Hamburger Menu Icon (Mobile Only) */}
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

        {/* Mobile Name Display */}
        <div className="sm:hidden">
          <Link
            to="heroSection"
            {...scrollConfig}
            className="text-white text-base sm:text-xl font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden sm:flex space-x-14 text-white sm:text-xl tracking-wide">
          <Link to="heroSection" {...scrollConfig} className="relative group cursor-pointer">
            home
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="aboutSection" {...scrollConfig} className="relative group cursor-pointer">
            about
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="projectsSection" {...scrollConfig} className="relative group cursor-pointer">
            projects
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="contactSection" {...scrollConfig} className="relative group cursor-pointer">
            contact
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>

      {/* Slide-in Mobile Menu */}
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
          <Link to="heroSection" {...scrollConfig} onClick={toggleMenu} className="text-base sm:text-xl cursor-pointer">
            home
          </Link>
          <Link to="aboutSection" {...scrollConfig} onClick={toggleMenu} className="text-base sm:text-xl cursor-pointer">
            about
          </Link>
          <Link to="projectsSection" {...scrollConfig} onClick={toggleMenu} className="text-base sm:text-xl cursor-pointer">
            projects
          </Link>
          <Link to="contactSection" {...scrollConfig} onClick={toggleMenu} className="text-base sm:text-xl cursor-pointer">
            contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
