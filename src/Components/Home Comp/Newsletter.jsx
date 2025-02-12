import React, { useState } from "react";
import {
  IoMailOutline,
  IoSendSharp,
  IoCheckmarkCircle,
  IoCloseCircle,
} from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await window.emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_name: formData.name,
        to_email: formData.email,
        message: formData.message,
      });

      setStatus("success");
      setFeedback("Thanks for subscribing! We'll be in touch soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setFeedback("Oops! Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <IoMailOutline className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Connected
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for updates, news, and exclusive content
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
              placeholder="Tell us what you're interested in..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <BiLoaderAlt className="animate-spin mr-2 h-5 w-5" />
                Subscribing...
              </>
            ) : (
              <>
                <IoSendSharp className="mr-2 h-5 w-5" />
                Subscribe Now
              </>
            )}
          </button>
        </form>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`mt-6 flex items-center justify-center p-4 rounded-lg ${
              status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status === "success" ? (
              <IoCheckmarkCircle className="h-5 w-5 mr-2" />
            ) : (
              <IoCloseCircle className="h-5 w-5 mr-2" />
            )}
            <p className="text-sm font-medium">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
