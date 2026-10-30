import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure, axiosPublic } from "./useAxios";
import Swal from "sweetalert2/dist/sweetalert2.js";

export function useUploadArtifactImage() {
  const axiosSecure = useAxiosSecure();

  const artifactUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosSecure.post("/upload-image/artifacts", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res.data;
    },
    onError: async (error) => {
      const errorMsg = error?.response?.data?.message || "Image Upload Failed";

      await Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: errorMsg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return artifactUploadMutation;
}

export function useUploadUserImage() {
  const userUploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axiosPublic.post("/upload-image/users", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onError: async (error) => {
      const errorMsg = error?.response?.data?.message || "Image Upload Failed";

      await Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: errorMsg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return userUploadMutation;
}
