/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { HiOutlineXMark, HiOutlineCheck } from "react-icons/hi2";
import { getCroppedImg } from "../../utils/cropImage";

const ImageCropModal = ({ imageSrc, isOpen, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setLoading(true);
      const croppedResult = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedResult) {
        onCropComplete(croppedResult);
      }
      onClose();
    } catch (err) {
      console.error("Failed to crop image:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Crop Profile Photo
            </h3>
            <p className="text-xs text-gray-400">Drag to reposition, use slider to zoom</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <HiOutlineXMark className="text-xl" />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 space-y-4 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primaryRed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyCrop}
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-redStart to-redEnd text-white hover:opacity-95 shadow-md shadow-primaryRed/10 transition-all active:scale-95 disabled:opacity-50"
            >
              <HiOutlineCheck className="text-base" />
              {loading ? "Cropping..." : "Save Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
