import React, { useState, useEffect, useRef } from "react";

const blogPosts = [
  {
    title: "Building the Authentication Service for Gratia",
    subtitle: "A Cloud-Native Food Donation Platform",
    description:
      "Deep dive into developing a Go-based authentication microservice with PostgreSQL, Docker, Kubernetes, and Terraform. Learn how to build scalable, secure auth for cloud-native applications.",
    date: "July 12, 2025",
    readTime: "8 min read",
    link: "https://gratia-auth-service-in-go.hashnode.dev/building-the-authentication-service-for-gratia-a-cloud-native-food-donation-platform",
    category: "Cloud-Native",
    gradient: "from-purple-500 to-pink-500",
    featured: true,
  },
  {
    title: "Coming Soon: Donation Service Deep Dive",
    subtitle: "Microservices Architecture in Action",
    description:
      "An in-depth look at how Gratia handles food listings and claims using event-driven architecture, message queues, and scalable microservices patterns.",
    date: "Coming Soon",
    readTime: "Planned",
    link: "#",
    category: "Microservices",
    gradient: "from-blue-500 to-cyan-500",
    featured: false,
  },
  {
    title: "Kubernetes for Developers",
    subtitle: "From Zero to Production",
    description:
      "Practical guide to deploying containerized applications on Kubernetes. Learn about pods, services, ingress, and production-ready configurations with real examples.",
    date: "Coming Soon",
    readTime: "Planned",
    link: "#",
    category: "DevOps",
    gradient: "from-emerald-500 to-teal-500",
    featured: false,
  },
];

export default function Blog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="blogSection"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 font-raleway pt-[100px] sm:pt-[125px] pb-[50px] sm:pb-[75px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10"></div>
      </div>

      {/* Orbs */}
      <div
        className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-3xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/3 rounded-full blur-3xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${15 + Math.random() * 20}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute w-[300px] h-[2px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-streak"
            style={{
              top: `${10 + i * 12}%`,
              left: "-10%",
              transform: `rotate(${i * 15}deg)`,
              animation: `streak ${12 + i * 2}s infinite linear`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_90%)] opacity-80 pointer-events-none"></div>

      {/* Content */}
      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl opacity-30" />
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-purple-300 via-white to-blue-300 bg-clip-text text-transparent">
                Latest
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Thoughts & Insights
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="w-3 h-3 rotate-45 bg-gradient-to-r from-purple-400/70 to-pink-400/70 animate-spin-slow" />
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>
          <p className="text-white/40 text-base sm:text-lg max-w-3xl mx-auto mt-8 leading-relaxed">
            Exploring the frontiers of backend development, cloud-native
            architecture, and DevOps through hands-on projects and deep
            technical dives.
          </p>
        </div>

        {/* Cards Grid - Fixed responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
          {blogPosts.map((blog, index) => (
            <div
              key={index}
              className={`group relative ${blog.featured ? "md:col-span-2" : ""}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative transition-all duration-500">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${blog.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${blog.gradient} opacity-70`}
                  />
                  <div className="p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <span className="px-3 py-1 text-xs font-semibold bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/60">
                        {blog.category}
                      </span>
                      <div className="flex items-center gap-2 text-white/30 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black mb-2 tracking-tight">
                      <span
                        className={`bg-gradient-to-r ${blog.gradient} bg-clip-text text-transparent`}
                      >
                        {blog.title}
                      </span>
                    </h2>
                    <h3 className="text-white/40 text-lg lg:text-xl mb-4 font-light">
                      {blog.subtitle}
                    </h3>
                    <p className="text-white/40 text-base lg:text-lg mb-6 leading-relaxed">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 text-white/30 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex gap-2">
                        {blog.category === "Cloud-Native" && (
                          <>
                            <span className="px-2 py-1 text-xs bg-purple-500/5 text-purple-300/70 rounded-full">
                              Kubernetes
                            </span>
                            <span className="px-2 py-1 text-xs bg-blue-500/5 text-blue-300/70 rounded-full">
                              Docker
                            </span>
                          </>
                        )}
                        {blog.category === "Microservices" && (
                          <>
                            <span className="px-2 py-1 text-xs bg-green-500/5 text-green-300/70 rounded-full">
                              Go
                            </span>
                            <span className="px-2 py-1 text-xs bg-yellow-500/5 text-yellow-300/70 rounded-full">
                              REST
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {blog.link !== "#" ? (
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white text-white/70 hover:text-black rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10 font-semibold">
                          Read Full Article
                        </span>
                        <svg
                          className="relative z-10 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform"
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
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${blog.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                        />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 text-white/20 rounded-xl border border-white/5 cursor-not-allowed"
                      >
                        <span>Coming Soon</span>
                        <svg
                          className="w-5 h-5 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-16">
          <button className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 text-white/50 group-hover:text-white/70 text-lg font-semibold flex items-center gap-3">
              View All Articles
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
