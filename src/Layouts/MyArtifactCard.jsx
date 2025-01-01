import React from "react";
import { BsArrowRight } from "react-icons/bs";
// Icons
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import UpdateMyArtifact from "./UpdateMyArtifact";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const MyArtifactCard = ({
  myArtifact,
  myAddedArtifacts,
  setMyAddedArtifacts,
}) => {
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://pastportals-server.vercel.app/artifacts/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Artifact has been deleted.",
                icon: "success",
              });
              const filtered = myAddedArtifacts.filter(
                (artifact) => artifact._id !== id
              );
              setMyAddedArtifacts(filtered);
            }
          });
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
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
      <div className="p-6 lg:p-10 flex-grow">
        <div className="flex flex-col gap-4">
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
      <div className="bg-gray-50 space-x-2 p-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={() =>
            document.getElementById(`${myArtifact._id}`).showModal()
          }
          className="btn bg-green-500 hover:opacity-95 text-white"
        >
          <MdEdit className="text-xl"></MdEdit>
        </button>
        <button
          onClick={() => handleDelete(myArtifact._id)}
          className="btn bg-red-500 hover:opacity-95 text-white"
        >
          <MdDelete className="text-xl"></MdDelete>
        </button>
      </div>

      {/* Modal */}
      <dialog id={`${myArtifact._id}`} className="modal">
        <div className="modal-box">
          <UpdateMyArtifact
            myArtifact={myArtifact}
            modalClose={() =>
              document.getElementById(`${myArtifact._id}`).close()
            }
          ></UpdateMyArtifact>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyArtifactCard;
