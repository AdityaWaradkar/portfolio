import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS SDK

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start submitting
    setIsSubmitting(true);
    setSubmissionStatus(""); // Clear previous submission status

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_gyzsg49", // Replace with your EmailJS service ID
        "template_n5au6vd", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email, // Use the user's email here
          message: formData.message,
        },
        "ymC0pPWWvgxHfiR1g" // Replace with your EmailJS user ID (not the private key)
      );

      if (result.status === 200) {
        setSubmissionStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setSubmissionStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionStatus("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false); // Stop submitting
    }
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

        {/* Submission Status */}
        {submissionStatus && (
          <div className="text-center text-lg mb-4">
            <p
              className={
                submissionStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {submissionStatus}
            </p>
          </div>
        )}

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
              disabled={isSubmitting}
              className="py-3 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
