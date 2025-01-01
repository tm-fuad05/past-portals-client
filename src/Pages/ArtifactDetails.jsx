import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// Icons
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const ArtifactDetails = () => {
  const { user } = useAuth();
  const eachArtifactData = useLoaderData();
  const [isLiked, setIsLiked] = useState(false);

  console.log(isLiked);
  const {
    artifactImage,
    artifactName,
    artifactType,
    historicalContext,
    createdAt,
    discoveredAt,
    discoveredBy,
    presentLocation,
    likeCount,
  } = eachArtifactData;
  const [favCount, setfavCount] = useState(likeCount);

  const likedartifact = { ...eachArtifactData, likedEmail: user.email };

  const handleLike = async () => {
    setIsLiked(true);
    setfavCount(favCount + 1);
    axios
      .post(
        `https://pastportals-server.vercel.app/likedArtifacts`,
        likedartifact
      )
      .then((res) => {
        if (res.data.insertedId) {
          toast.success(`You Liked ${artifactName}`);
        }
      });
  };

  return (
    <section>
      <div className="min-h-screen md:bg-gray-100 md:py-10 md:px-5">
        <div className="max-w-5xl mx-auto bg-white md:shadow-lg rounded-lg overflow-hidden">
          {/* Header Section with Image */}
          <div className="relative">
            <img
              src={artifactImage}
              alt={artifactName}
              className="inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-3xl lg:text-5xl font-bold text-white">
                {artifactName}
              </h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-10">
            <div className="space-y-4">
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
              <p className="text-gray-600">
                <strong>Present Location:</strong> {presentLocation}
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
            <div className="flex items-center justify-between w-full p-4 ">
              <div className="flex items-center gap-3 ">
                <button onClick={handleLike} disabled={isLiked}>
                  <FaHeart
                    className={`${
                      isLiked ? "text-[#ff3d3d] cursor-" : "text-[#424242]"
                    } text-[1.4rem] cursor-pointer`}
                  />
                </button>
                <span className="font-medium text-lg">{favCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtifactDetails;
