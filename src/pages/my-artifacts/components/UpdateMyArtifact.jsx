/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { useAuth } from "../../../provider/AuthProvider";
import { useUpdateArtifact } from "../../../hooks/my-artifacts/useUpdateArtifact";
import { updateArtifactSchema } from "../../../validation/artifact.validation";

const UpdateMyArtifact = ({ myArtifact, modalClose }) => {
  const { user } = useAuth();
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    artifactName: myArtifact?.artifactName || null,
    artifactImage: myArtifact?.artifactImage || null,
    artifactType: myArtifact?.artifactType || null,
    historicalContext: myArtifact?.historicalContext || null,
    createdTime: myArtifact?.createdTime || null,
    discoveredTime: myArtifact?.discoveredTime || null,
    discoveredBy: myArtifact?.discoveredBy || null,
    presentLocation: myArtifact?.presentLocation || null,
  });

  const nameError = error?.find((err) => err.field === "artifactName");
  const imageError = error?.find((err) => err.field === "artifactImage");
  const typeError = error?.find((err) => err.field === "artifactType");
  const contextError = error?.find((err) => err.field === "historicalContext");
  const createdTimeError = error?.find((err) => err.field === "createdTime");
  const discoveredTimeError = error?.find(
    (err) => err.field === "discoveredTime",
  );
  const locationError = error?.find((err) => err.field === "presentLocation");
  const discoveredByError = error?.find((err) => err.field === "discoveredBy");

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldError = error?.find((err) => err.field === name);
    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const updateMutation = useUpdateArtifact({ myArtifact, modalClose });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError([]);
    const { data: artifactsData, error: validationError } =
      updateArtifactSchema.safeParse(formData);

    if (validationError) {
      return setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );
    }

    updateMutation.mutate(artifactsData);
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
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., Rosetta Stone"
              />
            </div>
            {nameError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {nameError.message}
              </small>
            )}
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
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {imageError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {imageError.message}
              </small>
            )}
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
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white focus:outline-none appearance-none cursor-pointer pr-4 dark:[&>option]:bg-slate-950"
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
            {typeError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {typeError.message}
              </small>
            )}
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
                name="createdTime"
                value={formData.createdTime}
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., 196 BC"
              />
            </div>
            {createdTimeError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {createdTimeError.message}
              </small>
            )}
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
                name="discoveredTime"
                value={formData.discoveredTime}
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., 1799"
              />
            </div>
            {discoveredTimeError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {discoveredTimeError.message}
              </small>
            )}
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
                onChange={changeInputHandler}
                className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
                placeholder="e.g., Pierre-François Bouchard"
              />
            </div>
            {discoveredByError?.message && (
              <small className="text-xs text-red-500 pt-1 pl-1">
                {discoveredByError.message}
              </small>
            )}
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
              onChange={changeInputHandler}
              className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none"
              placeholder="e.g., The British Museum, London"
            />
          </div>
          {locationError?.message && (
            <small className="text-xs text-red-500 pt-1 pl-1">
              {locationError.message}
            </small>
          )}
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
              onChange={changeInputHandler}
              className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 focus:outline-none resize-none min-h-[100px]"
              placeholder="Provide a detailed chronicle of the historical significance..."
              rows="4"
            />
          </div>
          {contextError?.message && (
            <small className="text-xs text-red-500 pt-1 pl-1">
              {contextError.message}
            </small>
          )}
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
