import axios from "axios";
import useAuth from "../hooks/useAuth";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useState } from "react";

const AddArtifacts = () => {
  const { user } = useAuth();
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const form = e.target;

    const artifactName = form.artifactName.value;
    const artifactImage = form.artifactImage.value;
    const artifactType = form.artifactType.value;
    const historicalContext = form.historicalContext.value;
    const createdAt = form.createdAt.value;
    const discoveredAt = form.discoveredAt.value;
    const discoveredBy = form.discoveredBy.value;
    const presentLocation = form.presentLocation.value;

    const artifactAdderName = user.displayName;
    const artifactAdderEmail = user.email;

    const artifactsData = {
      artifactName,
      artifactImage,
      artifactType,
      historicalContext,
      createdAt,
      discoveredAt,
      discoveredBy,
      presentLocation,
      artifactAdderName,
      artifactAdderEmail,
      likeCount: 0,
    };

    axios
      .post("https://pastportals-server.vercel.app/artifacts", artifactsData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "successfully Registered",
            showConfirmButton: false,
            timer: 1000,
          });
          setLoader(false);
          form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen md:bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl md:my-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Artifact</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Artifact Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Name
            </label>
            <input
              type="text"
              name="artifactName"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter artifact name"
              required
            />
          </div>

          {/* Artifact Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Image (URL)
            </label>
            <input
              type="url"
              name="artifactImage"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter a valid image URL"
              required
            />
          </div>

          {/* Artifact Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Type
            </label>
            <select
              name="artifactType"
              className="select select-bordered w-full focus:outline-none"
              required
            >
              <option selected disabled>
                Select type
              </option>
              <option value="Tools">Tools</option>
              <option value="Weapons">Weapons</option>
              <option value="Documents">Documents</option>
              <option value="Writings">Writings</option>
            </select>
          </div>

          {/* Historical Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Historical Context
            </label>
            <textarea
              name="historicalContext"
              className="textarea textarea-bordered w-full focus:outline-none"
              placeholder="Enter historical context"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="text"
              name="createdAt"
              className="input input-bordered w-full focus:outline-none"
              placeholder="e.g., 100 BC"
              required
            />
          </div>

          {/* Discovered At */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discovered At
            </label>
            <input
              type="text"
              name="discoveredAt"
              className="input input-bordered w-full focus:outline-none"
              placeholder="e.g., 1799"
              required
            />
          </div>

          {/* Discovered By */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discovered By
            </label>
            <input
              type="text"
              name="discoveredBy"
              className="input input-bordered w-full focus:outline-none"
              placeholder="Enter discoverer's name"
              required
            />
          </div>

          {/* Present Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Present Location
            </label>
            <input
              type="text"
              name="presentLocation"
              className="input input-bordered w-ful focus:outline-none"
              placeholder="Enter present location"
              required
            />
          </div>

          {/* Logged-in User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Artifact Adder Name
              </label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Artifact Adder Email
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={loader}
              className="rounded-lg bg-gradient-to-r from-primaryRed to-darkRed text-white w-full font-semibold py-3 px-4  shadow-lg hover:from-lightRed hover:to-primaryRed"
            >
              {loader ? "Adding..." : "Add Artifact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtifacts;
