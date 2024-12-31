import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MyLikedArtifactCard from "../Layouts/MyLikedArtifactCard";

const MyLikedArtifacts = () => {
  const { user } = useAuth();
  const [myLikedArtifacts, setMyLikedArtifacts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-liked-artifacts?email=${user.email}`)
      .then((res) => setMyLikedArtifacts(res.data));
  }, []);

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-3 ">
      <h2 className="text-3xl md:text-4xl font-bold h-32 flex justify-center items-center">
        My Artifacts: {myLikedArtifacts.length}
      </h2>
      <hr />
      <div className="flex flex-col gap-3 my-10">
        {myLikedArtifacts.map((likedArtifact) => (
          <MyLikedArtifactCard
            key={likedArtifact._id}
            likedArtifact={likedArtifact}
          ></MyLikedArtifactCard>
        ))}
      </div>
    </div>
  );
};

export default MyLikedArtifacts;
