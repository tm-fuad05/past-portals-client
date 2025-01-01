import axios from "axios";
import useAuth from "../hooks/useAuth";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useState } from "react";

const UpdateMyArtifact = ({ myArtifact, modalClose }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    artifactName: myArtifact.artifactName || "",
    artifactImage: myArtifact.artifactImage || "",
    artifactType: myArtifact.artifactType || "",
    historicalContext: myArtifact.historicalContext || "",
    createdAt: myArtifact.createdAt || "",
    discoveredAt: myArtifact.discoveredAt || "",
    discoveredBy: myArtifact.discoveredBy || "",
    presentLocation: myArtifact.presentLocation || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    };
    console.log(artifactsData);

    axios
      .patch(
        `https://pastportals-server.vercel.app/artifacts/${myArtifact._id}`,
        artifactsData
      )
      .then((res) => {
        console.log(res.data);
        modalClose();
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "successfully Updated",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg ">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Artifact Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Artifact Name
            </label>
            <input
              type="text"
              value={formData.artifactName}
              onChange={handleChange}
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
              value={formData.artifactImage}
              onChange={handleChange}
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
              value={formData.artifactType}
              onChange={handleChange}
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
              value={formData.historicalContext}
              onChange={handleChange}
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
              value={formData.createdAt}
              onChange={handleChange}
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
              value={formData.discoveredAt}
              onChange={handleChange}
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
              value={formData.discoveredBy}
              onChange={handleChange}
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
              value={formData.presentLocation}
              onChange={handleChange}
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
            <button className="btn bg-gradient-to-r from-primaryRed to-darkRed text-white w-full font-semibold py-2 px-4  shadow-lg hover:from-lightRed hover:to-primaryRed">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMyArtifact;
