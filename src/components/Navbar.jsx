import React, { useState } from "react";
import { Link } from "react-scroll";
import profilePic from "../assets/Profile_pic.jpg"; // Import profile picture

const Navbar = () => {
  // State to control hamburger menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[90px] bg-black flex items-center justify-between px-8 shadow-md z-50 font-light">
        {/* Left Section: Profile and Name (hidden on mobile) */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-500 overflow-hidden">
            <img
              src={profilePic} // Use imported profile picture
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Link
            to="heroSection"
            smooth={true}
            duration={500}
            className="text-white text-3xl font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
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

        {/* Right Section: Name (Visible only on mobile) */}
        <div className="sm:hidden">
          <Link
            to="heroSection"
            smooth={true}
            duration={500}
            className="text-white text-lg font-light tracking-wide cursor-pointer"
          >
            aditya waradkar
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex space-x-14 text-white text-xl tracking-wide">
          {/* Scrollable Navigation Links */}
          <Link
            to="heroSection"
            smooth={true}
            duration={500}
            className="relative group cursor-pointer"
          >
            home
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="aboutSection"
            smooth={true}
            duration={500}
            className="relative group cursor-pointer"
          >
            about
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="projectsSection"
            smooth={true}
            duration={500}
            className="relative group cursor-pointer"
          >
            projects
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="contactSection"
            smooth={true}
            duration={500}
            className="relative group cursor-pointer"
          >
            contact
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu (Side Slide-in Menu) */}
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
        <div className="flex flex-col space-y-6">
          <Link
            to="heroSection"
            smooth={true}
            duration={500}
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            home
          </Link>
          <Link
            to="aboutSection"
            smooth={true}
            duration={500}
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            about
          </Link>
          <Link
            to="projectsSection"
            smooth={true}
            duration={500}
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            projects
          </Link>
          <Link
            to="contactSection"
            smooth={true}
            duration={500}
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
