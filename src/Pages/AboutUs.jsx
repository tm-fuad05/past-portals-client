import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiShield,
  FiPackage,
  FiHeart,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";

const AboutUs = () => {
  const achievements = [
    { number: "50K+", label: "Artifacts Preserved" },
    { number: "100+", label: "Expert Curators" },
    { number: "25+", label: "Years of History" },
    { number: "30+", label: "Museum Partners" },
  ];

  const values = [
    {
      icon: <FiHeart />,
      title: "Preservation",
      description:
        "Dedicated to protecting and maintaining the integrity of historical artifacts for future generations.",
    },
    {
      icon: <FiRefreshCw />,
      title: "Accessibility",
      description:
        "Making history accessible to everyone through digital preservation and virtual exhibitions.",
    },
    {
      icon: <FiClock />,
      title: "Authenticity",
      description:
        "Ensuring the historical accuracy and authenticity of every artifact in our collection.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Diagonal Design */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-rose-500 transform -skew-y-6 origin-top-left scale-110" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Preserving History,
              <span className="block">Inspiring Tomorrow</span>
            </h1>
            <p className="text-xl text-red-50 mb-8">
              We're dedicated to the preservation and celebration of historical
              artifacts, making our cultural heritage accessible to everyone
              through cutting-edge digital preservation techniques.
            </p>
            <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors inline-flex items-center group">
              Explore Our Collection
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Mission Statement with Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission is to preserve and protect historical artifacts
                while making them accessible to a global audience. Through
                digital innovation and expert curation, we bridge the gap
                between past and present, ensuring our cultural heritage endures
                for future generations.
              </p>
              <div className="flex items-center text-red-600 font-semibold cursor-pointer hover:text-red-700">
                View Collection
                <FiArrowRight className="ml-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-red-50 rounded-xl"
                >
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {item.number}
                  </div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section with Modern Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Commitment
          </h2>
          <p className="text-lg text-gray-600">
            We uphold the highest standards in artifact preservation and
            accessibility, guided by these core principles.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 rounded-2xl transform transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We offer comprehensive services in artifact preservation,
                documentation, and digital accessibility.
              </p>
              <button className="inline-flex items-center text-red-600 font-semibold hover:text-red-700">
                Learn About Our Process <FiArrowRight className="ml-2" />
              </button>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              {[
                { icon: <FiAward />, title: "Expert Curation" },
                { icon: <FiShield />, title: "Preservation" },
                { icon: <FiPackage />, title: "Digital Archives" },
                { icon: <FiRefreshCw />, title: "Restoration" },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Discover Our Collection
              </h2>
              <p className="text-red-100">
                Experience history through our carefully curated artifacts
              </p>
            </div>
            <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
