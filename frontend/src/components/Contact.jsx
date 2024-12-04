import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      id="contactSection"
      className="min-h-screen bg-gray-800 text-white flex items-center justify-center py-8 px-6 font-raleway"
    >
      <div className="w-full max-w-2xl bg-gray-700 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Contact Me
        </h2>
        <p className="text-lg text-center mb-6 text-gray-300">
          I'd love to hear from you! Please fill out the form below to get in
          touch with me. Alternatively, you can email me directly at{" "}
          <a
            href="mailto:adityawaradkar1801@gmail.com"
            className="text-blue-400"
          >
            adityawaradkar1801@gmail.com
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg text-gray-200 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-200 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email address"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-lg text-gray-200 mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Type your message here"
            ></textarea>
          </div>

          {/* Send Button */}
          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
