import React, { useEffect, useRef } from "react";

export default function AboutMe() {
  const backgroundRef = useRef(null);

  return (
    <div
      ref={backgroundRef}
      id="aboutSection"
      className="about-section min-h-screen text-white flex items-center justify-center px-8 font-raleway text-lg md:text-xl pt-[125px] pb-[75px]"
    >
      <div className="max-w-7xl w-full flex flex-col gap-12 relative z-10">
        {/* Left Section */}
        <div className="flex-[2] flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="leading-relaxed word-spacing">
            I specialize in backend development using Go and full-stack
            development with the MERN stack. With a solid foundation in Data
            Structures and Algorithms (DSA) using Java, I am currently deepening
            my expertise in DevOps. Passionate about building scalable and
            efficient web applications, I am continuously learning and committed
            to delivering clean, high-quality solutions.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-[3] flex flex-col gap-8">
          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {[
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
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  style={{
                    minWidth: "120px",
                    maxWidth: "fit-content",
                    flexGrow: 0,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <div className="flex flex-wrap gap-4">
              <div
                className="group bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white transition-all duration-300 ease-in-out"
                style={{
                  minWidth: "280px",
                  maxWidth: "fit-content",
                  flexGrow: 0,
                }}
              >
                <div className="font-semibold mb-1 group-hover:text-black">
                  Data Analyst Intern - Tata Power Renewable Energy Limited
                  <br />
                  <span className="text-sm group-hover:text-black">
                    Dec 2024 - Mar 2025
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-2 group-hover:text-black">
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
          </div>

          {/* Certifications Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-4">
              {[
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
              ].map((certification) => (
                <div
                  key={certification.name}
                  className="bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  style={{
                    minWidth: "180px",
                    maxWidth: "fit-content",
                    flexGrow: 0,
                  }}
                >
                  <a
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {certification.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Hobbies & Interests</h2>
            <div className="flex flex-wrap gap-4">
              <div
                className="bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                style={{
                  minWidth: "150px",
                  maxWidth: "fit-content",
                  flexGrow: 0,
                }}
              >
                <a
                  href="https://www.instagram.com/adityaa.draws/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pencil Sketching
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
