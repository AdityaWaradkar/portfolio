import React, { useState, useEffect, useRef } from "react";
import Icon1 from "../assets/icons/github-icon.svg";
import Icon2 from "../assets/icons/linkedin-icon.svg";
import Icon3 from "../assets/icons/instagram-icon.svg";

const PROFILE_PIC =
  "https://ik.imagekit.io/cs3et6gu9/Profile_pic.webp?updatedAt=1751304842467";

const HeroSection = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const purpleOrbRef = useRef(null);
  const blueOrbRef = useRef(null);
  const centerOrbRef = useRef(null);
  const timeRef = useRef(0);

  // Fetch visitor count
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visits`);
        if (!res.ok) throw new Error("Failed to fetch visitor count");
        const data = await res.json();
        setVisitorCount(data.visits);
        setError(null);
      } catch (err) {
        setError("Unable to load visitor count");
      }
    };
    fetchVisitorCount();
    const interval = setInterval(fetchVisitorCount, 10000);
    return () => clearInterval(interval);
  }, []);

  // Orb animations
  useEffect(() => {
    let animationFrame;
    let startTime = Date.now();
    const animateOrbs = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      timeRef.current = elapsed;
      if (purpleOrbRef.current) {
        const floatX = Math.sin(elapsed * 0.5) * 40;
        const floatY = Math.cos(elapsed * 0.7) * 30;
        const pulseScale = 1 + Math.sin(elapsed * 2) * 0.1;
        const hue = Math.sin(elapsed * 0.3) * 10 + 270;
        const opacity = 0.2 + Math.sin(elapsed * 1.5) * 0.08;
        purpleOrbRef.current.style.transform = `translate(${floatX}px, ${floatY}px) scale(${pulseScale})`;
        purpleOrbRef.current.style.background = `radial-gradient(circle at 30% 30%, hsla(${hue}, 70%, 50%, ${opacity}), hsla(${hue}, 70%, 30%, 0.05) 70%)`;
        purpleOrbRef.current.style.filter = `blur(${50 + Math.sin(elapsed) * 10}px)`;
      }
      if (blueOrbRef.current) {
        const orbitX = Math.sin(elapsed * 0.4) * 60;
        const orbitY = Math.cos(elapsed * 0.6) * 40;
        const breathScale = 1 + Math.sin(elapsed * 1.2) * 0.15;
        const blueHue = Math.sin(elapsed * 0.2) * 15 + 210;
        blueOrbRef.current.style.transform = `translate(${orbitX}px, ${orbitY}px) scale(${breathScale})`;
        blueOrbRef.current.style.background = `radial-gradient(circle at 70% 70%, hsla(${blueHue}, 75%, 45%, 0.25), hsla(${blueHue}, 75%, 25%, 0.05) 70%)`;
        blueOrbRef.current.style.filter = `blur(${60 + Math.sin(elapsed * 1.8) * 15}px)`;
      }
      if (centerOrbRef.current) {
        const driftX = Math.sin(elapsed * 0.2) * 20;
        const driftY = Math.cos(elapsed * 0.3) * 20;
        const pulseScale = 1 + Math.sin(elapsed * 1.0) * 0.2;
        centerOrbRef.current.style.transform = `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${pulseScale})`;
        centerOrbRef.current.style.background = `radial-gradient(circle at ${50 + Math.sin(elapsed) * 20}% ${50 + Math.cos(elapsed) * 20}%, rgba(128, 0, 255, 0.15), rgba(0, 0, 255, 0.05) 70%)`;
        centerOrbRef.current.style.filter = `blur(${70 + Math.sin(elapsed * 0.7) * 15}px)`;
      }
      animationFrame = requestAnimationFrame(animateOrbs);
    };
    animateOrbs();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const socialLinks = [
    { href: "https://github.com/AdityaWaradkar", icon: Icon1, alt: "GitHub" },
    {
      href: "https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/",
      icon: Icon2,
      alt: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/adityaa.draws",
      icon: Icon3,
      alt: "Instagram",
    },
  ];

  const iconClass =
    "w-5 h-5 sm:w-9 sm:h-9 transition-all duration-300 filter brightness-0 invert hover:brightness-100 hover:invert-0";

  return (
    <div
      id="homeSection"
      ref={sectionRef}
      className="relative w-full h-[100vh] overflow-hidden text-white text-center px-4 bg-[#0a0a0f]"
    >
      {/* Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-30"></div>
      </div>

      {/* Orbs */}
      <div
        ref={purpleOrbRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full transition-all duration-300 ease-out"
        style={{
          transform: "translate(0px, 0px)",
          willChange: "transform, background, filter",
          mixBlendMode: "screen",
        }}
      ></div>
      <div
        ref={blueOrbRef}
        className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full transition-all duration-300 ease-out"
        style={{
          transform: "translate(0px, 0px)",
          willChange: "transform, background, filter",
          mixBlendMode: "screen",
        }}
      ></div>
      <div
        ref={centerOrbRef}
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full transition-all duration-300 ease-out"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform, background, filter",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-streak"
            style={{
              top: `${20 + i * 15}%`,
              left: "-10%",
              transform: `rotate(${i * 10}deg)`,
              animation: `streak ${8 + i * 2}s infinite linear`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_90%)] opacity-90 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        {/* Mobile Profile */}
        <div className="sm:hidden mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <img
              src={PROFILE_PIC}
              alt="Aditya Waradkar profile"
              className="relative w-36 h-36 rounded-full object-cover ring-4 ring-purple-500/20 ring-offset-4 ring-offset-[#0a0a0f]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Heading - Fixed responsive text */}
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-3xl scale-150"></div>
          <h1
            className="relative font-raleway font-bold tracking-tight leading-tight text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-10xl bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent animate-gradient-x p-5 break-words"
            style={{
              textShadow:
                "0 0 30px rgba(128, 0, 255, 0.2), 0 0 60px rgba(0, 0, 255, 0.1)",
            }}
          >
            Hey, I'm Aditya Waradkar
          </h1>
        </div>

        {/* Sub-heading */}
        <div className="relative mt-4 sm:mt-6 space-y-3 sm:space-y-4 py-5">
          <div className="relative flex items-center justify-center gap-3 py-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-gradient-to-r from-purple-400/70 to-blue-400/70 animate-pulse"></div>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
          <div className="relative group">
            <span
              className="relative block font-raleway font-light text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent tracking-wide"
              style={{ textShadow: "0 0 20px rgba(128, 0, 255, 0.15)" }}
            >
              crafting systems that make a difference
            </span>
          </div>
        </div>
      </div>

      {/* Social & Visitor Count */}
      <div className="absolute bottom-8 z-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 sm:gap-8 text-center w-fit">
        <div className="flex justify-center gap-8 sm:gap-16">
          {socialLinks.map((social, index) => (
            <a
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.alt} profile`}
              className="relative group animate-float-icon"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
              <img
                src={social.icon}
                alt={social.alt}
                className={`${iconClass} relative z-10`}
                style={{
                  filter:
                    "brightness(0) invert(0.8) drop-shadow(0 0 10px rgba(128, 0, 255, 0.2))",
                }}
              />
            </a>
          ))}
        </div>

        {/* Visitor Count */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative backdrop-blur-sm bg-white/5 px-6 py-2 rounded-full border border-white/5 hover:border-purple-500/20 transition-all duration-300">
            <span
              className="font-raleway font-medium text-transparent bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-sm sm:text-base tracking-wide italic leading-snug"
              style={{ letterSpacing: "1.1px" }}
              aria-live="polite"
            >
              {visitorCount !== null ? (
                <>
                  <span className="font-bold text-purple-300/80">
                    {visitorCount.toLocaleString()}
                  </span>{" "}
                  visitors...
                  <br className="sm:hidden" />
                  <span className="text-white/80">
                    {" "}
                    &nbsp;and you're one of them.
                  </span>
                  <span className="block sm:inline text-white/60 text-xs sm:text-sm mt-1 sm:mt-0 sm:ml-1">
                    Thanks for stopping by!
                  </span>
                </>
              ) : error ? (
                error
              ) : (
                "Counting the curious ones..."
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
