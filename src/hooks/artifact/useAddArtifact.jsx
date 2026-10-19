import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export function useAddArtifact(formRef) {
  const axiosSecure = useAxiosSecure();
  const postMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/artifacts", payload);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1000,
        });
        formRef.current.reset();
      }
    },
    onError: async (error) => {
      const errorMsg =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";

      await Swal.fire({
        position: "center",
        icon: "error",
        title: errorMsg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  return postMutation;
}
