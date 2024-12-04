import React from "react";
import todoListImage from "../assets/to-do-list-app.jpg"; // Import first project image
import parksenseImage from "../assets/parksense.jpg"; // Import second project image

export default function Project() {
  return (
    <div
      id="projectsSection"
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12 px-8 font-raleway"
    >
      <div className="max-w-7xl w-full space-y-24">
        {/* First Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Image */}
          <div className="flex justify-center items-center">
            <img
              src={todoListImage} // Use the imported image here
              alt="To Do List App"
              className="rounded-lg shadow-lg w-full max-w-sm"
            />
          </div>

          {/* Right Section - Project Description */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              To Do List App
            </h2>
            <p className="text-lg md:text-xl mb-6 leading-relaxed">
              This is a simple To Do List application that allows users to add,
              edit, and delete tasks. It utilizes React for frontend
              development, providing a seamless and dynamic user experience.
              Features include task prioritization and deadline management.
            </p>
            <a
              href="https://github.com/AdityaWaradkar/to-do-app-microservice-backend" // Link to your GitHub project
              target="_blank" // Opens the link in a new tab
              className="inline-block py-3 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              View Project
            </a>
          </div>
        </div>
        {/* Second Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Image */}
          <div className="flex justify-center items-center">
            <img
              src={parksenseImage} // Use the imported image for the second project
              alt="ParkSense"
              className="rounded-lg shadow-lg w-full max-w-sm"
            />
          </div>

          {/* Right Section - Project Description */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ParkSense</h2>
            <p className="text-lg md:text-xl mb-6 leading-relaxed">
              ParkSense is an IoT-based smart parking system that uses sensors
              and real-time data to find available parking spots. It offers a
              user-friendly interface and optimizes parking in crowded areas,
              improving the overall parking experience.
            </p>
            <a
              href="https://github.com/AdityaWaradkar/IoT_based_smart_parking_system" // Updated GitHub link for second project
              target="_blank" // Opens the link in a new tab
              className="inline-block py-3 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              View Project
            </a>
          </div>
        </div>

        {/* "More projects coming soon..." message */}
        <div className="flex justify-center items-center text-xl text-gray-400 mt-12">
          <p>More projects coming soon...</p>
        </div>
      </div>
    </div>
  );
}
