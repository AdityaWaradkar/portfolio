import React, { useState, useEffect } from "react";
import contactBackground from "../assets/contact_page_background.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    setStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message || "Message sent successfully!");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(data.message || "Failed to send message.");
        setStatus("error");
      }
    } catch (error) {
      setResponseMessage("Error sending message. Please try again.");
      setStatus("error");
      console.error("Contact form submission error:", error);
    }

    setIsSubmitting(false);
  };

  // Optional: auto clear message after 5 seconds
  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage("");
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  return (
    <div
      id="contactSection"
      className="relative min-h-screen text-white flex items-center justify-center py-8 px-6 font-raleway overflow-hidden"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-2xl bg-gray-700 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Contact Me
        </h2>
        <p className="text-lg text-center mb-6 text-gray-300">
          I'd love to hear from you! Please fill out the form below to get in
          touch with me.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... input fields same as before ... */}
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
              disabled={isSubmitting}
            />
          </div>

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
              disabled={isSubmitting}
            />
          </div>

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
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {responseMessage && (
          <p
            className={`mt-4 text-center font-semibold transition-opacity duration-300 ${
              status === "success"
                ? "text-green-400"
                : status === "error"
                ? "text-red-400"
                : "text-yellow-300"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
