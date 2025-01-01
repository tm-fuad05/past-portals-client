import axios from "axios";

import React, { useEffect, useState } from "react";
import ArtifactCard from "../Layouts/ArtifactCard";
import empty from "../assets/empty.jpg";

const AllArtifacts = () => {
  const [allArtifacts, setAllArtifacts] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchaAllArtifacts = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/artifacts?search=${search}`
      );
      setAllArtifacts(data);
    };
    fetchaAllArtifacts();
  }, [search]);

  return (
    <div className="w-11/12 mx-auto">
      <label className="input input-bordered flex items-center gap-2 my-10 w-10/12 md:w-1/2 mx-auto">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="grow "
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <h2 className="text-3xl md:text-4xl font-bold h-32 flex justify-center items-center">
        Artifacts: {allArtifacts.length}
      </h2>
      <hr />

      {allArtifacts.length === 0 ? (
        <div className="w-7/12 mx-auto my-20">
          <img src={empty} alt="" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-500 text-center">
            No Data Found
          </h2>
        </div>
      ) : (
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArtifacts.map((artifact) => (
            <ArtifactCard artifact={artifact}></ArtifactCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllArtifacts;
