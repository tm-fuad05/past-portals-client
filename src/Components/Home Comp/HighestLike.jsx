import axios from "axios";
import React, { useEffect, useState } from "react";
import HighestArtifactCard from "../../Layouts/HighestArtifactCard";

const HighestLike = () => {
  const [highestLikedData, setHighestLikedData] = useState([]);
  useEffect(() => {
    const fetchHighestLike = async () => {
      const { data } = await axios.get(
        "https://pastportals-server.vercel.app/highest-like-count"
      );
      setHighestLikedData(data);
    };
    fetchHighestLike();
  }, []);

  return (
    <div className="w-11/12 mx-auto mb-24">
      <h2 className="text-2xl md:text-3xl text-center font-bold mb-10">
        Highest Like Artifacts
      </h2>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highestLikedData.map((artifact) => (
          <HighestArtifactCard artifact={artifact}></HighestArtifactCard>
        ))}
      </div>
    </div>
  );
};

export default HighestLike;
