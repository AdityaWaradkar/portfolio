import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/backgroundImage.jpg";
import backgroundImage_2 from "../assets/backgroundImage_2.png";
import backgroundImage_3 from "../assets/backgroundImage_3.jpg";
import Icon1 from "../assets/icons/github-icon.svg";
import Icon2 from "../assets/icons/linkedin-icon.svg";
import Icon3 from "../assets/icons/instagram-icon.svg";
import profilePic from "../assets/Profile_pic.jpg";

const HeroSection = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        const res = await fetch("http://localhost:8080/api/visits");
        if (!res.ok) throw new Error("Failed to fetch visitor count");
        const data = await res.json();
        setVisitorCount(data.visits);
        setError(null);
      } catch (err) {
        setError("Unable to load visitor count");
      }
    }

    fetchVisitorCount();
    const interval = setInterval(fetchVisitorCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="homeSection"
      className="relative w-full h-[100vh] overflow-hidden text-white text-center px-4 "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage_3})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-65 z-0" />

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col justify-center items-center h-full pt-40"
        style={{ transform: "translateY(-45px)" }}
      >
        {/* Mobile View */}
        <div className="sm:hidden flex flex-col items-center mb-28">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h1 className="font-raleway text-2xl font-thin tracking-[1px] leading-snug">
            Hey, I'm Aditya Waradkar
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-200">
            Full-stack developer skilled in MERN and Go, passionate about DevOps
            and building scalable systems.
            <br />
            Always Learning and Always Sketching
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:flex flex-col items-center mb-48">
          <h1 className="font-raleway text-[2.5rem] sm:text-[5rem] md:text-8xl lg:text-[8rem] font-thin tracking-[2px] leading-tight">
            Hey, I'm Aditya Waradkar
          </h1>
          <p className="mt-6">
            <span
              className="font-raleway font-thin tracking-wide block"
              style={{
                fontSize: "25px",
                lineHeight: "32px",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
                wordSpacing: "5px",
              }}
            >
              Full-stack developer skilled in MERN and Go, passionate about
              DevOps and building scalable systems.
              <br />
              Always learning and always sketching.
            </span>
          </p>
        </div>
      </div>

      {/* Social Icons & Visitor Count */}
      <div className="absolute bottom-8 z-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-5 sm:gap-6 text-center w-fit">
        <div className="flex justify-center gap-10 sm:gap-24">
          <a
            href="https://github.com/AdityaWaradkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Icon1}
              alt="GitHub"
              className="w-4 h-4 sm:w-8 sm:h-8 transition-transform hover:scale-110"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Icon2}
              alt="LinkedIn"
              className="w-4 h-4 sm:w-8 sm:h-8 transition-transform hover:scale-110"
            />
          </a>
          <a
            href="https://www.instagram.com/adityaa.draws"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Icon3}
              alt="Instagram"
              className="w-4 h-4 sm:w-8 sm:h-8 transition-transform hover:scale-110"
            />
          </a>
        </div>

        <span
          className="font-raleway font-light text-white text-sm sm:text-base tracking-wide italic px-4 sm:px-0 max-w-[90%] sm:max-w-full leading-snug"
          style={{ letterSpacing: "1.1px", opacity: 0.95 }}
        >
          {visitorCount !== null ? (
            <>
              {visitorCount.toLocaleString()} visitors...
              <br className="sm:hidden" />
              &nbsp;and you’re one of them. Thanks for stopping by!
            </>
          ) : (
            "Counting the curious ones..."
          )}
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
