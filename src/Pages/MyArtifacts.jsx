import React, { useEffect, useState } from "react";
import MyArtifactCArd from "../Layouts/MyArtifactCard";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const MyArtifacts = () => {
  const { user } = useAuth();
  const [myAddedArtifacts, setMyAddedArtifacts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-artifacts?email=${user.email}`)
      .then((res) => setMyAddedArtifacts(res.data));
  }, []);

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold h-32 flex justify-center items-center">
          My Artifacts: {myAddedArtifacts.length}
        </h2>
        <hr />
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAddedArtifacts.map((myArtifact) => (
            <MyArtifactCArd
              key={myArtifact._id}
              myArtifact={myArtifact}
              myAddedArtifacts={myAddedArtifacts}
              setMyAddedArtifacts={setMyAddedArtifacts}
            ></MyArtifactCArd>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyArtifacts;
