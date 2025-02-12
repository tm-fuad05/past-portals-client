import React from "react";
import { FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

const MuseumInfo = () => {
  return (
    <div className="my-24 flex items-center justify-center w-11/12 mx-auto">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-gray-100 p-8 flex-1">
          <h4 className="text-sm text-gray-500 font-medium uppercase mb-2">
            About Us
          </h4>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            The World's Leading Museum of History & Culture.
          </h1>
          <p className="text-gray-600 mb-4">
            Desires to obtain pain of itself, because it is pain because
            occasionally.
          </p>
          <p className="text-gray-600">
            Explain to you how all this mistaken idea of denouncing pleasure and
            praising pain was born and I will give you a complete account of the
            system, and the actual teachings of the great explorer of the truth.
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800  text-white p-8 flex-1">
          {/* Location Info */}
          <div className="mb-6">
            <FaMapMarkerAlt className="text-3xl text-red-500 mb-2" />
            <h2 className="text-xl font-bold mb-1">Egypt Museum</h2>
            <p className="text-gray-300">
              Flat A, 20/7, Reynolds Neck, Helenaville 08745.
            </p>
            <a href="#" className="text-red-400 font-medium mt-2 block">
              Get Direction +
            </a>
          </div>

          {/* Free Admission Info */}
          <div>
            <FaTicketAlt className="text-3xl text-red-500 mb-2" />
            <h2 className="text-xl font-bold mb-1">Free Admission</h2>
            <p className="text-gray-300">
              Exhibitions are free for our museum members.
            </p>
            <a href="#" className="text-red-400 font-medium mt-2 block">
              Become a Member +
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumInfo;
