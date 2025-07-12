import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection"; // Import the HeroSection component
import AboutMe from "./components/AboutMe";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <AboutMe/>
        <Blog/>
        <Project/>
        <Contact/>
      </main>
    </div>
  );
};

export default App;
