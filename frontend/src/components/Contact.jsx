import React, { useState, useEffect } from "react";
import Icon1 from "../assets/icons/github-icon.svg";
import Icon2 from "../assets/icons/linkedin-icon.svg";
import Icon3 from "../assets/icons/instagram-icon.svg";

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

const navLinks = ["home", "about", "blog", "projects"];

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    setStatus(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message || "Message sent successfully!");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(data.message || "Failed to send message.");
        setStatus("error");
      }
    } catch (error) {
      setResponseMessage("Error sending message. Please try again.");
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage("");
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  const scrollToSection = (section) => {
    const element = document.getElementById(`${section}Section`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/20 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm sm:text-base";

  return (
    <footer
      id="contactSection"
      className="relative w-full bg-[#0a0a0f] text-white overflow-hidden border-t border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3a3a4a_1px,transparent_1px),linear-gradient(to_bottom,#3a3a4a_1px,transparent_1px)] bg-[size:96px_96px] opacity-5" />
      </div>

      {/* Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-600/3 rounded-full blur-3xl" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${12 + Math.random() * 15}s infinite linear`,
              animationDelay: `${Math.random() * 8}s`,
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
              top: `${15 + i * 18}%`,
              left: "-10%",
              transform: `rotate(${i * 12}deg)`,
              animation: `streak ${10 + i * 3}s infinite linear`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_90%)] opacity-70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="w-2 h-2 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-spin-slow" />
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
          <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have a project in mind, a question, or just want to say
            hello — I'm always happy to connect.
          </p>
        </div>

        {/* 3-Column Grid - Fixed responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent">
                  Aditya Waradkar
                </span>
              </h3>
              <p className="text-white/40 text-base leading-relaxed">
                Full-stack developer crafting scalable systems with MERN, Go,
                and DevOps.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link)}
                      className="group relative text-white/40 hover:text-white/90 text-base transition-all duration-300 flex items-center gap-3"
                    >
                      <span className="w-6 h-[1px] bg-white/20 group-hover:w-8 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300" />
                      <span className="relative">
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                Connect
              </h4>
              <div className="flex items-center gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-150" />
                    <div className="relative p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <img
                        src={social.icon}
                        alt={social.alt}
                        className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Form */}
          <div className="md:col-span-5">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl p-4 xs:p-6 sm:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
                    Send a Message
                  </span>
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  I'll get back to you within 24 hours
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white/40 text-xs sm:text-sm font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white/40 text-xs sm:text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white/40 text-xs sm:text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className={inputClass}
                      placeholder="Your message here..."
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full group/btn mt-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 blur-md" />
                    <div className="relative px-6 py-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2 text-white/90 font-semibold text-base">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg
                              className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </>
                        )}
                      </span>
                    </div>
                  </button>
                  {responseMessage && (
                    <div
                      className={`mt-4 p-3 rounded-xl text-sm text-center ${status === "success" ? "bg-green-500/10 text-green-400/90 border border-green-500/20" : "bg-red-500/10 text-red-400/90 border border-red-500/20"}`}
                    >
                      {responseMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                Contact Info
              </h4>
              <div className="group relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <svg
                        className="w-4 h-4 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Email</p>
                      <a
                        href="mailto:adityawaradkar2004@gmail.com"
                        className="text-white/80 hover:text-white text-sm"
                      >
                        adityawaradkar2004@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <svg
                        className="w-4 h-4 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Location</p>
                      <p className="text-white/80 text-sm">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                  Availability
                </h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-white/90 text-sm font-medium">
                    Open to opportunities
                  </span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  Available for freelance work and Internship positions. Based
                  in Mumbai, India (GMT+5:30).
                </p>
              </div>
            </div>

            {/* Current Stack */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <h4 className="text-white/50 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                  Current Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "MERN",
                    "Go",
                    "DevOps",
                    "Cloud",
                    "K8s",
                    "Docker",
                    "AWS",
                    "Terraform",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs sm:text-sm">
            © {new Date().getFullYear()} Aditya Waradkar. Crafted with
            precision.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-white/20 text-xs bg-white/5 px-3 py-1 rounded-full border border-white/5">
              v2.0.0
            </span>
            <span className="text-white/20 text-xs">•</span>
            <span className="text-white/20 text-xs bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 rounded-full border border-white/5">
              MERN Stack
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
