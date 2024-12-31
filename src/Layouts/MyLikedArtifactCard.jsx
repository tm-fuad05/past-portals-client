import React from "react";

const MyLikedArtifactCard = ({ likedArtifact }) => {
  return (
    <div className="border p-5 md:p-3 rounded-lg flex flex-col md:flex-row gap-4">
      <figure className="md:w-2/12 h-72 md:h-full">
        <img
          className="w-full h-full rounded-lg object-cover"
          src={likedArtifact.artifactImage}
          alt=""
        />
      </figure>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl lg:text-2xl font-semibold">
          {likedArtifact.artifactName}
        </h3>
        <p className="text-gray-600 text-sm md:text-md">
          <strong>Type:</strong> {likedArtifact.artifactType}
        </p>
        <p className="text-gray-600 text-sm md:text-md">
          <strong>Discovered By:</strong> {likedArtifact.discoveredBy}
        </p>
        <p className="text-gray-600 text-sm md:text-md">
          <strong>Created At:</strong> {likedArtifact.createdAt}
        </p>
      </div>
    </div>
  );
};

export default MyLikedArtifactCard;
