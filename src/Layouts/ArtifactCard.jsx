import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const ArtifactCard = ({ artifact }) => {
  return (
    <div className=" relative bg-white shadow-md rounded-xl flex flex-col">
      <img
        src={artifact.artifactImage}
        alt="image"
        className="w-full h-80 md:h-72 object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h1 className="text-[1.3rem] font-bold leading-[34px]">
            {artifact.artifactName}
          </h1>
          <span className="bg-red-100 font-medium rounded-full px-2 py-1">
            {artifact.artifactType}
          </span>
        </div>
        <p className="text-[0.9rem] text-gray-400 py-2 flex-grow">
          {artifact.historicalContext}
        </p>
        <hr />
        <p className="text-[0.9rem]">
          <span className="font-semibold text-[0.9rem]">Discovered By:</span>{" "}
          {artifact.discoveredBy}
        </p>
      </div>

      <div className="flex justify-end mx-2">
        <NavLink
          to={`/artifact/${artifact.artifactName}/${artifact._id}`}
          className=" p-3 w-fit hover:bg-gray-100 cursor-pointer mr-2 mb-2 rounded-full group"
        >
          <BsArrowRight className="text-[1.5rem] text-darkRed" />
        </NavLink>
      </div>
    </div>
  );
};

export default ArtifactCard;
