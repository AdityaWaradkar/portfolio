import React from "react";
import todoListImage from "../assets/to-do-list-app.jpg";
import parksenseImage from "../assets/parksense.jpg";
import gratiaImage from "../assets/Gratia.jpg";

export default function Project() {
  // Image class: hidden on mobile (below md), visible from md up, fixed width & height with object-cover
  const imageClass =
    "rounded-lg shadow-lg w-full max-w-sm h-96 object-cover hidden md:block";

  // Shared button styles for View Project and status indicator
  const buttonStyle =
    "inline-flex items-center justify-center py-3 px-6 rounded-lg text-lg font-semibold transition-colors";

  return (
    <div
      id="projectsSection"
      className="project-section min-h-screen text-white flex flex-col items-center justify-center py-12 px-8 font-raleway pt-40"
    >
      <div className="max-w-7xl w-full space-y-24">
        {/* 🔷 Gratia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <img src={gratiaImage} alt="Gratia" className={imageClass} />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gratia</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Gratia is a full-stack cloud-native platform designed to bridge
              the gap between restaurants/caterers and NGOs for efficient food
              donation. It uses a microservices architecture with Go and React,
              and is powered by a complete DevOps stack including Docker,
              Kubernetes (EKS), GitHub Actions, and Terraform. NGOs can browse
              live listings from restaurants, filtered by location, and claim
              surplus food via a real-time messaging system. Gratia is more than
              a project — it’s a social impact platform engineered with
              scalability, automation, and sustainability in mind.
            </p>

            {/* Buttons container */}
            <div className="flex gap-4">
              <a
                href="https://github.com/AdityaWaradkar/Gratia"
                target="_blank"
                className={`${buttonStyle} bg-teal-500 hover:bg-teal-600 text-white`}
              >
                View Project
              </a>

              <div
                className={`${buttonStyle} bg-yellow-500/90 text-yellow-100 border border-yellow-400 cursor-default select-none`}
                style={{ minWidth: "140px", justifyContent: "center" }}
              >
                In Progress
              </div>
            </div>
          </div>
        </div>

        {/* 🔷 ParkSense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <img src={parksenseImage} alt="ParkSense" className={imageClass} />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ParkSense</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              ParkSense is an IoT-based smart parking system that integrates
              hardware and software to optimize parking in congested areas. By
              utilizing sensors and real-time data, it helps users find
              available parking spots quickly and efficiently. This project was
              developed as part of my Semester 5 coursework and has been
              officially accepted at
              <span className="font-semibold text-blue-400">
                {" "}
                ICT4SD 2025 — a prestigious international conference
              </span>
              . It combines a user-friendly interface with efficient hardware
              integration to enhance the overall parking experience.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/AdityaWaradkar/IoT_based_smart_parking_system"
                target="_blank"
                className={`${buttonStyle} bg-teal-500 hover:bg-teal-600 text-white`}
              >
                View Project
              </a>

              <div
                className={`${buttonStyle} bg-green-600 text-green-100 border border-green-500 cursor-default select-none`}
                style={{ minWidth: "140px", justifyContent: "center" }}
              >
                Completed
              </div>
            </div>
          </div>
        </div>

        {/* 🔷 To Do List App */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <img
              src={todoListImage}
              alt="To Do List App"
              className={imageClass}
            />
          </div>

          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              To Do List App
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              The To-Do List application is a user-friendly tool built with
              React for the frontend and Go for the backend, providing a dynamic
              and responsive experience. Users can easily add, edit, and delete
              tasks, while also prioritizing them and setting deadlines. With
              its simple yet effective features, the application helps users
              stay organized and manage tasks efficiently.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/AdityaWaradkar/to-do-app-microservice-backend"
                target="_blank"
                className={`${buttonStyle} bg-teal-500 hover:bg-teal-600 text-white`}
              >
                View Project
              </a>

              <div
                className={`${buttonStyle} bg-green-600 text-green-100 border border-green-500 cursor-default select-none`}
                style={{ minWidth: "140px", justifyContent: "center" }}
              >
                Completed
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center text-xl text-gray-400 mt-12">
          <p>More projects coming soon...</p>
        </div>
      </div>
    </div>
  );
}
