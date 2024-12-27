import React from "react";
// Icons
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const MyArtifactCard = ({ myArtifact }) => {
  const {
    artifactImage,
    artifactName,
    artifactType,
    historicalContext,
    createdAt,
    discoveredAt,
    discoveredBy,
    presentLocation,
  } = myArtifact;

  return (
    <div className="">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section with Image */}
        <div className="relative">
          <img
            src={artifactImage}
            alt={artifactName}
            className="inset-0 w-full h-80 md:h-72 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-white text-center">
              {artifactName}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-10 ">
          <div className="flex flex-col gap-4 flex-grow">
            <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
            <hr />
            <p className="text-gray-600">
              <strong>Type:</strong> {artifactType}
            </p>
            <p className="text-gray-600">
              <strong>Historical Context:</strong> {historicalContext}
            </p>
            <p className="text-gray-600">
              <strong>Created At:</strong> {createdAt}
            </p>
            <p className="text-gray-600">
              <strong>Discovered At:</strong> {discoveredAt}
            </p>
            <p className="text-gray-600">
              <strong>Discovered By:</strong> {discoveredBy}
            </p>
            <p className="text-gray-600 flex-grow">
              <strong>Present Location:</strong> {presentLocation}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-50 space-x-2 p-4 border-t border-gray-200 ">
          <button className="btn bg-green-500 hover:opacity-95 text-white">
            <MdEdit className="text-xl"></MdEdit>
          </button>
          <button className="btn bg-red-500 hover:opacity-95 text-white">
            <MdDelete className="text-xl"></MdDelete>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyArtifactCard;
