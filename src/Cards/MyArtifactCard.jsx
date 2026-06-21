import React from "react";
import axios from "axios";
import UpdateMyArtifact from "./UpdateMyArtifact";

// Swal
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// Icons
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineGlobeAlt,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineMapPin,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const MyArtifactCard = ({
  myArtifact,
  myAddedArtifacts,
  setMyAddedArtifacts,
}) => {
  const {
    _id,
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
      text: "This node will be permanently purged from the archive!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff3d3d",
      cancelButtonColor: "rgba(148, 163, 184, 0.3)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://pastportals-server.vercel.app/artifacts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Purged!",
                text: "The Artifact has been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              const filtered = myAddedArtifacts.filter(
                (artifact) => artifact._id !== id,
              );
              setMyAddedArtifacts(filtered);
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  return (
    <div className="h-full flex flex-col rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl shadow-gray-200/40 dark:shadow-none overflow-hidden group hover:border-primaryRed/30 dark:hover:border-primaryRed/30">
      {/* Image Exhibition Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-slate-900">
        <img
          src={artifactImage}
          alt={artifactName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />

        {/* Absolute Badge */}
        <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-widest text-primaryRed bg-white/90 dark:bg-slate-900/90 border border-primaryRed/20 px-2.5 py-1 rounded-lg backdrop-blur-md">
          {artifactType}
        </span>
      </div>

      {/* Pure Technical Content Info Grid */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight line-clamp-1">
              {artifactName}
            </h3>
          </div>

          {/* Minimal Information List */}
          <div className="space-y-2.5 text-xs font-semibold text-gray-600 dark:text-white dark:text-gray-300">
            <div className="flex items-center gap-2.5">
              <HiOutlineGlobeAlt className="text-primaryRed text-base shrink-0" />
              <span className="text-gray-600 dark:text-white font-bold uppercase tracking-wider min-w-[75px]">
                Location:
              </span>
              <span className="truncate font-normal">{presentLocation}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <HiOutlineUser className="text-primaryRed text-base shrink-0" />
              <span className="text-gray-600 dark:text-white font-bold uppercase tracking-wider min-w-[75px]">
                Discoverer:
              </span>
              <span className="truncate font-normal">{discoveredBy}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <HiOutlineCalendar className="text-primaryRed text-base shrink-0" />
              <span className="text-gray-600 dark:text-white font-bold uppercase tracking-wider min-w-[75px]">
                Timeline:
              </span>
              <span className="truncate font-normal">{createdAt}</span>
            </div>
          </div>

          {/* Inline Description Snippet */}
          <div className="pt-2 border-t border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 dark:text-gray-400  leading-relaxed line-clamp-2 pl-0.5">
              {historicalContext}
            </p>
          </div>
        </div>

        {/* Management Actions Footer */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
          <button
            onClick={() => document.getElementById(`modal_${_id}`).showModal()}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-white/5 text-gray-600 dark:text-white dark:text-gray-300 hover:text-green-500 hover:bg-green-500/5 dark:hover:bg-green-500/10 active:scale-95 transition-all"
            title="Edit Node"
          >
            <HiOutlinePencilSquare className="text-lg" />
          </button>

          <button
            onClick={() => handleDelete(_id)}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-white/5 text-gray-600 dark:text-white  hover:text-primaryRed hover:bg-primaryRed/5 dark:hover:bg-primaryRed/10 active:scale-95 transition-all"
            title="Purge Node"
          >
            <HiOutlineTrash className="text-lg" />
          </button>
        </div>
      </div>

      {/* Premium Micro-Styled Modal Structure */}
      <dialog id={`modal_${_id}`} className="modal backdrop-blur-md">
        <div className="modal-box max-w-2xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl overflow-y-auto">
          <UpdateMyArtifact
            myArtifact={myArtifact}
            modalClose={() => document.getElementById(`modal_${_id}`).close()}
          />
          <div className="modal-action border-t border-gray-100  dark:border-white/5 pt-4 mt-6">
            <form method="dialog">
              <button className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyArtifactCard;
