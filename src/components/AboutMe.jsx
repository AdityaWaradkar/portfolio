import React from "react";

export default function AboutMe() {
  return (
    <div
      id="aboutSection"
      className="min-h-screen bg-gray-700 text-white flex items-center justify-center px-8 font-raleway text-lg md:text-xl pt-[125px] pb-[75px]"
    >
      <div className="max-w-7xl w-full flex flex-col gap-12">
        {/* Left Section (2/5) */}
        <div className="flex-[2] flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="leading-relaxed word-spacing">
            I specialize in Go for backend development and the MERN stack.
            Currently enhancing my skills through an IBM DevOps course, I have a
            strong foundation in Data Structures and Algorithms (DSA) using
            Java. Passionate about building scalable web applications, Always
            eager to learn, I strive to deliver high-quality results.
          </p>
        </div>

        {/* Right Section (3/5) */}
        <div className="flex-[3] flex flex-col gap-8">
          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {[
                "JavaScript",
                "GoLang",
                "React",
                "Java",
                "Git",
                "Github",
                "Shell Scripting",
                "Linux",
                "Node.js",
                "Mongo DB",
                "UI / UX",
                "Tailwind CSS",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  style={{
                    minWidth: "120px", // Ensure the minimum width for each tile
                    maxWidth: "fit-content", // Adjust width based on content
                    flexGrow: 0,
                  }}
                >
                  {skill}
                </div>
              ))}
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
                    minWidth: "180px", // Ensure the minimum width for each certification tile
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

          {/* Hobbies & Interests Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Hobbies & Interests</h2>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  name: "Pencil Sketching",
                  link: "https://www.instagram.com/adityaa.draws/",
                },
                {
                  name: "Photography",
                  link: "https://www.instagram.com/adityaa.draws/",
                },
              ].map((hobby) => (
                <div
                  key={hobby.name}
                  className="bg-gray-800 p-4 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                  style={{
                    minWidth: "150px", // Ensure the minimum width for each hobby tile
                    maxWidth: "fit-content",
                    flexGrow: 0,
                  }}
                >
                  <a
                    href={hobby.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hobby.name}
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
