import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import MyLikedArtifactCard from "../Layouts/MyLikedArtifactCard";
import empty from "../assets/empty.jpg";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyLikedArtifacts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [myLikedArtifacts, setMyLikedArtifacts] = useState([]);
  useEffect(() => {
    axiosSecure
      .get(`/my-liked-artifacts?email=${user.email}`)
      .then((res) => setMyLikedArtifacts(res.data));
  }, [user.email]);

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-3 ">
      <h2 className="text-3xl md:text-4xl font-bold h-32 flex justify-center items-center">
        My Liked Artifacts: {myLikedArtifacts.length}
      </h2>
      <hr />
      {myLikedArtifacts.length === 0 ? (
        <div className="w-7/12 mx-auto my-20">
          <img src={empty} alt="" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-500 text-center">
            No Data Found
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-3 my-10">
          {myLikedArtifacts.map((likedArtifact) => (
            <MyLikedArtifactCard
              key={likedArtifact._id}
              likedArtifact={likedArtifact}
            ></MyLikedArtifactCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLikedArtifacts;
