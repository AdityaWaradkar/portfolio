import React from "react";
import backgroundImage from "../assets/backgroundImage.jpg"; // Import the image
import Icon1 from "../assets/icons/github-icon.svg"; // Import your icon files
import Icon2 from "../assets/icons/linkedin-icon.svg";
import Icon3 from "../assets/icons/instagram-icon.svg";
import profilePic from "../assets/profile_pic.png"; // Import your profile picture

const HeroSection = () => {
  return (
    <div id="heroSection" className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Content over the Image */}
      <div className="absolute inset-0 flex-row justify-center items-start text-center text-white z-10 pt-[150px] sm:pt-[150px]">
        {/* Profile Picture (Visible only on mobile) */}
        <div className="sm:hidden mb-4">
          <img
            src={profilePic} // Use imported profile picture
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        </div>

        {/* "Hey, I'm Aditya Waradkar" - Hidden on mobile */}
        <h1 className="font-raleway text-[2.5rem] sm:text-[5rem] md:text-8xl lg:text-[8rem] font-thin tracking-[2px] hidden sm:block">
          Hey, I'm Aditya Waradkar
        </h1>
      </div>

      {/* Paragraph with Raleway font - Hidden on mobile */}
      <div className="absolute inset-0 flex justify-center items-start z-10 pt-[350px] sm:pt-[350px] md:pt-[350px] sm:flex">
        <div className="max-w-[1000px] w-full h-[130px] text-white flex justify-center items-center p-4">
          <p className="font-raleway text-lg sm:text-xl md:text-2xl font-light tracking-wide text-center word-spacing pt-24">
            I specialize in building robust backend systems with Go and
            developing full-stack applications using the MERN stack. Currently
            interning at The Tata Power Company Limited, I am passionate about
            DevOps. Beyond coding, I enjoy pencil sketching and photography.
          </p>
        </div>
      </div>

      {/* Icons Section */}
      <div className="absolute z-10 flex justify-center gap-6 sm:gap-14 pt-40 sm:pt-52 top-[calc(350px+130px)] sm:top-[calc(350px+130px)] w-full">
        <a
          href="https://github.com/AdityaWaradkar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Icon1}
            alt="GitHub"
            className="w-8 h-8 sm:w-8 sm:h-8 transition-transform transform hover:scale-110"
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
            className="w-8 h-8 sm:w-8 sm:h-8 transition-transform transform hover:scale-110"
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
            className="w-8 h-8 sm:w-8 sm:h-8 transition-transform transform hover:scale-110"
          />
        </a>
      </div>

      {/* Dark Blur Effect Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-[3px] z-0"></div>
    </div>
  );
};

export default HeroSection;
