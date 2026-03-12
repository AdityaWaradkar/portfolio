/**
 * AboutMe Component
 * Displays personal information, skills, experience, certifications, and hobbies
 * Features: Responsive grid layout with hover effects on cards
 */
import React from "react";

// Data
const skills = [
  "JavaScript",
  "GoLang",
  "React.js",
  "Java",
  "Git",
  "GitHub",
  "Shell Scripting",
  "Linux",
  "Node.js",
  "MongoDB",
  "SQL",
  "Python",
  "Docker",
  "Kubernetes",
  "GitLab CI/CD",
  "Jenkins",
  "AWS",
  "Cloud Computing",
  "DevOps",
  "Fullstack Development",
  "UI / UX",
  "Tailwind CSS",
];

const certifications = [
  {
    name: "Introduction to DevOps",
    link: "https://www.coursera.org/account/accomplishments/verify/Z277A2QW5G4C",
  },
  {
    name: "Introduction to Cloud Computing",
    link: "https://www.coursera.org/account/accomplishments/verify/B1V7BQL80VPX",
  },
  {
    name: "Introduction to Agile Development and Scrum",
    link: "https://www.coursera.org/account/accomplishments/verify/J5J6YJPWP7EV",
  },
  {
    name: "Getting Started with Git and GitHub",
    link: "https://www.coursera.org/account/accomplishments/verify/GLR3HS12TEAX",
  },
  {
    name: "Hands-on Introduction to Linux Commands and Shell Scripting",
    link: "https://www.coursera.org/account/accomplishments/verify/NL9Z4NKZKIZF",
  },
  {
    name: "Java Programming",
    link: "https://drive.google.com/file/d/1-tKaPLssdVhix02fBLXa0KtMYARVrB9X/view",
  },
];

const cardBaseClass =
  "bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-md shadow-lg text-white/90 hover:bg-white hover:text-black border border-white/5 hover:border-white/20 transition-all duration-300 ease-in-out text-sm sm:text-base";

export default function AboutMe() {
  return (
    <div
      id="aboutSection"
      className="relative min-h-screen text-white flex items-center justify-center px-4 sm:px-8 font-raleway text-base sm:text-lg md:text-xl pt-[100px] sm:pt-[125px] pb-[50px] sm:pb-[75px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10"></div>
      </div>

      {/* Orbs */}
      <div className="absolute top-20 left-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_80%)] opacity-60 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* About Me */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent inline-block">
              About Me
            </h1>
            <p className="leading-relaxed word-spacing text-gray-300/90 text-sm sm:text-base md:text-lg">
              I specialize in backend development using Go and full-stack
              development with the MERN stack. With a solid foundation in Data
              Structures and Algorithms (DSA) using Java, I am currently
              deepening my expertise in DevOps. Passionate about building
              scalable and efficient web applications, I am continuously
              learning and committed to delivering clean, high-quality
              solutions.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90">
              Experience
            </h2>
            <div className={`${cardBaseClass} group w-full`}>
              <div className="font-semibold mb-1 group-hover:text-black">
                Data Analyst Intern - Tata Power Renewable Energy Limited
                <br />
                <span className="text-xs sm:text-sm text-white/60 group-hover:text-black/70">
                  Dec 2024 - Mar 2025
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 mt-2 group-hover:text-black/80">
                During this internship, I worked on a project titled: <br />
                <em>
                  “Energy Loss Analysis due to DC Shortfall at Solar Sites.”
                </em>{" "}
                <br />
                The goal was to understand how underperformance in DC capacity
                impacts energy generation at solar plants. I developed a
                Python-based analysis module to quantify these losses across
                multiple sites, which helped in identifying inefficiencies and
                improving operational decisions.
              </p>
            </div>
          </div>

          {/* Hobbies */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90">
              Hobbies & Interests
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {["Pencil Sketching", "Photography"].map((hobby) => (
                <div
                  key={hobby}
                  className={cardBaseClass}
                  style={{ minWidth: "130px" }}
                >
                  <a
                    href="https://www.instagram.com/adityaa.draws/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors duration-300 block"
                  >
                    {hobby}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Skills */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className={cardBaseClass}
                  style={{ minWidth: "100px" }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className={cardBaseClass}
                  style={{ minWidth: "150px" }}
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors duration-300 block"
                  >
                    {cert.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
