/**
 * Project Component
 * Displays project portfolio in an interactive carousel
 * Features: Smooth horizontal scrolling, project cards with hover effects, navigation controls
 */
import React, { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: "gratia",
    name: "Gratia",
    status: "in-progress",
    description:
      "Cloud-native food donation platform connecting restaurants with NGOs to reduce food waste.",
    longDescription:
      "Gratia is a cloud-native platform using Go microservices and React, powered by Docker, Kubernetes (EKS), and Terraform. NGOs can browse food listings from restaurants, filter by location, and claim surplus food through real-time messaging. Features include user authentication, donation tracking, impact analytics, and automated notifications.",
    githubLink: "https://github.com/AdityaWaradkar/Gratia",
    tech: [
      "Go",
      "React",
      "Kubernetes",
      "Terraform",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "EKS",
    ],
    color: "from-purple-500 to-blue-500",
    highlights: [
      "Microservices Architecture",
      "Cloud-Native",
      "Real-time Updates",
      "Social Impact",
    ],
  },
  {
    id: "parksense",
    name: "ParkSense",
    status: "completed",
    description:
      "IoT-based smart parking system accepted at ICT4SD 2025 international conference.",
    longDescription:
      "ParkSense uses ultrasonic sensors and Arduino to detect vehicle presence in real-time, with a Node.js backend and React frontend. Users can view available spots, reserve spaces, and receive navigation guidance. Features include parking duration tracking, automated billing, and occupancy analytics.",
    githubLink:
      "https://github.com/AdityaWaradkar/IoT_based_smart_parking_system",
    tech: [
      "IoT",
      "Python",
      "Arduino",
      "React",
      "Node.js",
      "MongoDB",
      "REST API",
      "Sensor Integration",
    ],
    color: "from-green-500 to-teal-500",
    highlights: [
      "IoT Integration",
      "Conference Paper",
      "Real-time Detection",
      "Urban Mobility",
    ],
  },
  {
    id: "todo",
    name: "To Do List App",
    status: "completed",
    description:
      "Full-stack task management app with React frontend and Go backend.",
    longDescription:
      "A task management tool with React frontend and Go backend using MongoDB. Features include task creation, editing, completion tracking, and deletion. Advanced capabilities include task prioritization, deadline setting with date picker, task categorization with tags, and search/filter functionality.",
    githubLink:
      "https://github.com/AdityaWaradkar/to-do-app-microservice-backend",
    tech: [
      "React",
      "Go",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
      "JWT Auth",
      "Context API",
    ],
    color: "from-orange-500 to-pink-500",
    highlights: [
      "Task Management",
      "CRUD Operations",
      "Priority System",
      "Deadline Tracking",
    ],
  },
];

export default function Project() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const scrollToProject = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current && !isHovering) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < projects.length
      ) {
        setActiveIndex(newIndex);
      }
    }
  };

  const nextProject = () =>
    scrollToProject((activeIndex + 1) % projects.length);
  const prevProject = () =>
    scrollToProject((activeIndex - 1 + projects.length) % projects.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div
      id="projectsSection"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 font-raleway pt-[100px] sm:pt-[125px] pb-[50px] sm:pb-[75px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10"></div>
      </div>

      {/* Orbs */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${10 + Math.random() * 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_80%)] opacity-60 pointer-events-none"></div>

      {/* Content */}
      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h1>
          <div className="flex justify-center gap-2">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            <div className="w-2 h-2 rotate-45 bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"></div>
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Nav Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 flex items-center justify-center text-white/70 hover:text-white shadow-xl"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 flex items-center justify-center text-white/70 hover:text-white shadow-xl"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth py-4"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="min-w-full snap-center px-4 sm:px-8"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-visible border border-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 py-10 lg:py-12 px-8 lg:px-10">
                  <div className="flex items-start justify-between mb-10">
                    <div
                      className={`h-1 w-20 rounded-full bg-gradient-to-r ${project.color}`}
                    />
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md border ${
                        project.status === "completed"
                          ? "bg-green-500/10 text-green-300 border-green-500/30"
                          : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                      }`}
                    >
                      {project.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>

                  <h2 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span
                      className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                    >
                      {project.name}
                    </span>
                  </h2>

                  <p className="text-white/60 text-lg lg:text-xl mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs lg:text-sm bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-white/80 font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mb-10">
                    <h3 className="text-sm uppercase tracking-wider text-white/40 mb-4">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5">
                    <h3 className="text-sm uppercase tracking-wider text-white/40 mb-3">
                      Detailed Overview
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white text-white/90 hover:text-black rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden w-full sm:w-auto justify-center text-lg font-semibold"
                  >
                    <span className="relative z-10">View on GitHub</span>
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
                      className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500`}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`group relative h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-12 bg-gradient-to-r from-purple-400 to-blue-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              >
                {index === activeIndex && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
