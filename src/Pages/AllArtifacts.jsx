import axios from "axios";

import React, { useEffect, useState } from "react";
import ArtifactCard from "../Layouts/ArtifactCard";
import empty from "../assets/empty.jpg";

const AllArtifacts = () => {
  const [allArtifacts, setAllArtifacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/artifacts")
      .then((res) => setAllArtifacts(res.data));
  }, []);

  return (
    <div className="w-11/12 mx-auto">
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
