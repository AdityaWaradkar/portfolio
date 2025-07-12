import React from "react";

const Blog = () => {
  const blogs = [
    {
      title:
        "Building the Authentication Service for Gratia : A Cloud-Native Food Donation Platform",
      description:
        "In this blog, I’ll walk you through developing the authentication microservice for Gratia, a food donation platform connecting restaurants with NGOs. It’s a personal project where I’m learning and applying backend development and cloud-native concepts using Go, PostgreSQL, Docker, Kubernetes, and Terraform.",
      date: "July 12, 2025",
      link: "https://gratia-auth-service-in-go.hashnode.dev/building-the-authentication-service-for-gratia-a-cloud-native-food-donation-platform",
    },
    {
      title: "Coming Soon: Donation Service Deep Dive",
      description:
        "A breakdown of how Gratia will handle food listings and claims in a scalable microservice.",
      date: "Planned",
      link: "#",
    },
  ];

  return (
    <div
      id="blogSection"
      className="relative w-full bg-[#2b422f] text-white flex items-center justify-center px-8 font-raleway text-lg md:text-xl pt-[125px] pb-[125px] font-medium"
    >
      <div className="max-w-7xl w-full flex flex-col gap-7 relative z-10">
        {/* Heading */}
        <div>
          <h1 className="text-5xl font-bold mb-6">My Blogs</h1>
          {/* Left aligned description below heading */}
          <p className="text-gray-300 text-base md:text-lg max-w-7xl text-left leading-relaxed word-spacing mb-12">
            Insights, stories, and tutorials from my journey in backend
            development, DevOps, and full-stack engineering. I share practical,
            hands-on experiences gained through building real-world projects,
            deep-dives into complex systems, and best practices that ensure
            scalable, maintainable, and efficient code. Whether you're a
            beginner or an experienced developer, my blogs aim to provide
            valuable knowledge and tips to help you sharpen your skills,
            overcome challenges, and grow confidently in the ever-evolving tech
            landscape.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group bg-gray-800 p-6 rounded-md shadow-lg text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out border border-white/10 cursor-default"
              style={{
                minWidth: "280px",
                maxWidth: "fit-content",
                flexGrow: 0,
              }}
            >
              <h3 className="text-3xl font-bold mb-4 group-hover:text-black">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2 group-hover:text-black">
                {blog.date}
              </p>
              <p className="text-sm text-gray-300 mb-4 group-hover:text-black leading-relaxed word-spacing">
                {blog.description}
              </p>
              {blog.link !== "#" && (
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-400 font-semibold hover:underline group-hover:text-black text-sm"
                >
                  Read Full Blog →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:8px_8px,8px_8px,20px_20px,20px_20px,40px_40px,40px_40px]" />
      </div>
    </div>
  );
};

export default Blog;
