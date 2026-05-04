import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import Blog from "./components/Blog";
import Project from "./components/Project";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <HeroSection />
        <AboutMe />
        <Project />
        <Blog />
        <Contact />
      </main>
    </div>
  );
};

export default App;
