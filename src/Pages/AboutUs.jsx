import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative h-44 bg-gradient-to-r from-red-300 to-red-500 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto text-center py-12 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl text-gray-700"
        >
          Welcome to <strong>PastPortals</strong>, your digital gateway to the
          past. Our mission is to make historical artifacts accessible,
          preserved, and cherished by all.
        </motion.p>
      </div>

      {/* Mission Section */}
      <div className="bg-red-50 py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-red-700">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          We strive to document, manage, and share historical artifacts with
          enthusiasts, researchers, and collectors worldwide. Our platform
          ensures proper authentication, digital preservation, and user
          engagement.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-red-700">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Artifact Preservation",
              desc: "Ensuring historical artifacts remain documented and accessible for future generations.",
            },
            {
              title: "Community Engagement",
              desc: "A platform for researchers, historians, and enthusiasts to connect and share insights.",
            },
            {
              title: "Advanced Tracking",
              desc: "Seamlessly track and manage artifacts with our intuitive system.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-md rounded-2xl p-6 text-center border border-red-200"
            >
              <h3 className="text-xl font-medium text-red-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-300 to-red-500 text-white text-center py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Join Us in Preserving History
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Become part of our community and help preserve the world's most
          treasured artifacts. Explore, document, and contribute!
        </p>
        <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
