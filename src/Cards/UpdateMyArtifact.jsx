import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// Icons
import {
  HiOutlineDocumentText,
  HiOutlineLink,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineUserCircle,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { HiOutlineCollection } from "react-icons/hi";

const UpdateMyArtifact = ({ myArtifact, modalClose }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    artifactName: myArtifact?.artifactName || "",
    artifactImage: myArtifact?.artifactImage || "",
    artifactType: myArtifact?.artifactType || "",
    historicalContext: myArtifact?.historicalContext || "",
    createdAt: myArtifact?.createdAt || "",
    discoveredAt: myArtifact?.discoveredAt || "",
    discoveredBy: myArtifact?.discoveredBy || "",
    presentLocation: myArtifact?.presentLocation || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const artifactsData = {
      ...formData,
      artifactAdderName: user?.displayName,
      artifactAdderEmail: user?.email,
    };

    axios
      .patch(
        `https://pastportals-server.vercel.app/artifacts/${myArtifact._id}`,
        artifactsData,
      )
      .then((res) => {
        modalClose();
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full bg-transparent">
      {/* Title Header */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
          Update{" "}
          <span className="bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
            Artifact Details
          </span>
        </h2>
        <p className="text-[11px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mt-0.5">
          Modify registered historical entry parameters
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Layout Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Artifact Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Artifact Name
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineDocumentText className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <input
                type="text"
                name="artifactName"
                value={formData.artifactName}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., Rosetta Stone"
                required
              />
            </div>
          </div>

          {/* Artifact Image URL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Artifact Image (URL)
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineLink className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <input
                type="url"
                name="artifactImage"
                value={formData.artifactImage}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          {/* Artifact Type */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Artifact Type
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineCollection className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <select
                name="artifactType"
                value={formData.artifactType}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white focus:outline-none appearance-none cursor-pointer pr-4 dark:[&>option]:bg-slate-950"
                required
              >
                <option value="" disabled>
                  Select Core Cluster
                </option>
                <option value="Tools">Tools</option>
                <option value="Weapons">Weapons</option>
                <option value="Documents">Documents</option>
                <option value="Writings">Writings</option>
              </select>
            </div>
          </div>

          {/* Created At */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Created At / Origin Era
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineClock className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., 196 BC"
                required
              />
            </div>
          </div>

          {/* Discovered At */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Discovered At (Year)
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineClock className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <input
                type="text"
                name="discoveredAt"
                value={formData.discoveredAt}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., 1799"
                required
              />
            </div>
          </div>

          {/* Discovered By */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
              Discovered By
            </label>
            <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
              <HiOutlineUser className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
              <input
                type="text"
                name="discoveredBy"
                value={formData.discoveredBy}
                onChange={handleChange}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., Pierre-François Bouchard"
                required
              />
            </div>
          </div>
        </div>

        {/* Present Location (Full Width) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
            Present Location
          </label>
          <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 transition-all duration-300 group">
            <HiOutlineMapPin className="text-gray-600 dark:text-gray-400 group-focus-within:text-primaryRed text-lg mr-3 transition-colors" />
            <input
              type="text"
              name="presentLocation"
              value={formData.presentLocation}
              onChange={handleChange}
              className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
              placeholder="e.g., The British Museum, London"
              required
            />
          </div>
        </div>

        {/* Historical Context Description (Full Width) */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400 pl-1">
            Historical Context / Chronicles
          </label>
          <div className="relative flex items-start bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3.5 focus-within:border-primaryRed/50 transition-all duration-300 group">
            <input type="hidden" /> {/* Align standard */}
            <textarea
              name="historicalContext"
              value={formData.historicalContext}
              onChange={handleChange}
              className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none resize-none min-h-[100px]"
              placeholder="Provide a detailed chronicle of the historical significance..."
              rows="4"
              required
            />
          </div>
        </div>

        {/* Read-Only Terminal Stats (Two Column Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
            <HiOutlineUserCircle className="text-gray-600 dark:text-gray-400 text-lg" />
            <div className="truncate">
              <p className="text-[9px] font-black uppercase text-gray-600 dark:text-gray-400 tracking-wider">
                User Name
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-600 dark:text-gray-400 truncate">
                {user?.displayName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
            <HiOutlineEnvelope className="text-gray-600 dark:text-gray-400 text-lg" />
            <div className="truncate">
              <p className="text-[9px] font-black uppercase text-gray-600 dark:text-gray-400 tracking-wider">
                User Email
              </p>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-600 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-redStart to-redEnd text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-redStart/10 hover:shadow-redStart/20 active:scale-[0.99] transition-all duration-200"
          >
            Save Modified Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyArtifact;
