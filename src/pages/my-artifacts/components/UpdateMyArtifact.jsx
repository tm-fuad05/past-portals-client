/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
// Icons
import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineUserCircle,
  HiOutlineEnvelope,
  HiOutlinePhoto,
  HiOutlineXMark,
} from "react-icons/hi2";
import { HiOutlineCollection } from "react-icons/hi";
import { useAuth } from "../../../provider/AuthProvider";
import { useUpdateArtifact } from "../../../hooks/useMyArtifact";
import { updateArtifactSchema } from "../../../validation/artifact.validation";
import { useUploadArtifactImage } from "../../../hooks/useUploadImage";

const UpdateMyArtifact = ({ myArtifact, modalClose }) => {
  const { user } = useAuth();
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(
    myArtifact?.artifactImage || null,
  );
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, artifactImage: file }));

    if (imageError) setError((prev) => [...prev, (imageError.message = "")]);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, artifactImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldError = error?.find((err) => err.field === name);
    if (fieldError) setError((prev) => [...prev, (fieldError.message = "")]);
  };

  const updateMutation = useUpdateArtifact({ myArtifact, modalClose });
  const uploadMutation = useUploadArtifactImage();

  const handleSubmit = async (e) => {
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

    try {
      const { artifactImage } = artifactsData;
      let photoURL = myArtifact.artifactImage;

      if (artifactImage instanceof File) {
        const uploadResult = await uploadMutation.mutateAsync(artifactImage);
        photoURL = uploadResult?.imageUrl;
      }

      updateMutation.mutate({ ...artifactsData, artifactImage: photoURL });
    } catch {}
  };

  const isSubmitting = uploadMutation.isPending || updateMutation.isPending;

  return (
    <div className="w-full bg-transparent">
      {/* Title Header */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
          Update{" "}
          <span className="inline-block bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
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
        </div>

        {/* Image Upload with Preview */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 pl-1">
            Artifact Image
          </label>

          {previewUrl ? (
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-slate-950/10 shadow-lg group/preview transition-all duration-300">
              <img
                src={previewUrl}
                alt="Artifact Preview"
                className="w-full h-full object-contain transition-transform duration-500 group-hover/preview:scale-105"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-primaryRed text-white rounded-full backdrop-blur-md transition-all shadow-md active:scale-95"
                title="Remove image"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-white/10 hover:border-primaryRed/50 rounded-2xl p-8 cursor-pointer bg-gray-50/50 dark:bg-white/5 transition-all group"
            >
              <HiOutlinePhoto className="text-4xl text-gray-400 group-hover:text-primaryRed transition-colors mb-2" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Click to upload artifact photo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {imageError?.message && (
            <small className="text-xs text-red-500 pt-1 pl-1">
              {imageError.message}
            </small>
          )}
        </div>

        {/* Additional Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-primaryRed to-darkRed text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:opacity-95 shadow-lg shadow-primaryRed/10 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMyArtifact;
