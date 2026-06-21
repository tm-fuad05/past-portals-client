import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// Icons
import {
  HiOutlineIdentification,
  HiOutlineLink,
  HiOutlineTag,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMapPin,
} from "react-icons/hi2";

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

    const artifactAdderName = user?.displayName;
    const artifactAdderEmail = user?.email;

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
            title: "Successfully Registered",
            showConfirmButton: false,
            timer: 1000,
          });
          setLoader(false);
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-transparent flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Aesthetic Architectural Blur Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primaryRed/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-darkRed/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 space-y-6">
        {/* Core Terminal Form Shell */}
        <div className="bg-white border border-gray-200/60 dark:bg-slate-900/40  dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none backdrop-blur-xl">
          {/* Header Dashboard Info */}
          <div className="space-y-1 mb-8 border-b border-gray-100 dark:border-white/5 pb-5 text-center sm:text-left">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
              Archival{" "}
              <span className="bg-gradient-to-r from-primaryRed to-darkRed bg-clip-text text-transparent">
                Registry
              </span>
            </h2>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Enlist new historical artifacts into the global databank
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Grid for Name & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Artifact Name
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50 group">
                  <HiOutlineIdentification className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <input
                    type="text"
                    name="artifactName"
                    placeholder="e.g., Rosetta Stone"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Artifact Type
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                  <HiOutlineTag className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <select
                    name="artifactType"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white focus:outline-none cursor-pointer appearance-none dark:[&>option]:bg-slate-900"
                    required
                    defaultValue={""}
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
            </div>

            {/* Row 2: Image Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                Artifact Image URL
              </label>
              <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                <HiOutlineLink className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                <input
                  type="url"
                  name="artifactImage"
                  placeholder="https://domain.com/secure-vault-image.jpg"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Row 3: Historical Context Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                Historical Context Description
              </label>
              <div className="relative flex bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                <HiOutlineDocumentText className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3 mt-0.5" />
                <textarea
                  name="historicalContext"
                  placeholder="Describe the historical era, significance, and ancestral trajectory..."
                  rows="4"
                  className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Row 4: Grid for Epoch Origin & Discovered Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Epoch Origin (Created At)
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                  <HiOutlineCalendar className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <input
                    type="text"
                    name="createdAt"
                    placeholder="e.g., 196 BC or Medieval Era"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Discovery Timestamp
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                  <HiOutlineCalendar className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <input
                    type="text"
                    name="discoveredAt"
                    placeholder="e.g., July 1799"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 5: Grid for Discoverer & Current Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Discovered By
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                  <HiOutlineUser className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <input
                    type="text"
                    name="discoveredBy"
                    placeholder="e.g., Pierre-François Bouchard"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
                  Present Location
                </label>
                <div className="relative flex items-center bg-gray-50/50 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 focus-within:border-primaryRed/50  group">
                  <HiOutlineMapPin className="text-gray-400 group-focus-within:text-primaryRed text-base mr-3" />
                  <input
                    type="text"
                    name="presentLocation"
                    placeholder="e.g., British Museum, London"
                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 6: Structural System Readonly Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-dashed border-gray-200 dark:border-white/5 pt-5 mt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-700 pl-1">
                  Archivist Agent
                </label>
                <div className="flex items-center bg-gray-100/70 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 opacity-60 cursor-not-allowed">
                  <HiOutlineUser className="text-gray-400 text-base mr-3" />
                  <input
                    type="text"
                    value={user?.displayName || "Anonymous Admin"}
                    readOnly
                    className="w-full bg-transparent text-sm font-bold text-gray-600 dark:text-gray-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-700 pl-1">
                  Archivist Digital Signature
                </label>
                <div className="flex items-center bg-gray-100/70 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl px-4 py-3 opacity-60 cursor-not-allowed">
                  <HiOutlineDocumentText className="text-gray-400 text-base mr-3" />
                  <input
                    type="email"
                    value={user?.email || "system@vault.io"}
                    readOnly
                    className="w-full bg-transparent text-sm font-bold text-gray-600 dark:text-gray-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Submit Block Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loader}
                className="w-full py-3.5 bg-gradient-to-r from-primaryRed to-darkRed text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 shadow-lg shadow-primaryRed/10 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loader ? "Indexing System..." : "Commit Artifact Entry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtifacts;
