import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";

export function useUpdateArtifact({ myArtifact, modalClose }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.patch(
        `/artifacts/${myArtifact._id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        modalClose();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({
          queryKey: ["artifacts"],
        });
      }
    },

    onError: async (error) => {
      const errorMsg =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something went wrong!";
      modalClose();
      await Swal.fire({
        position: "center",
        icon: "error",
        title: errorMsg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return updateMutation;
}
