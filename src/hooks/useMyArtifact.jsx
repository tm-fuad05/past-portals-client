import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.js";

// Get My added Artifacts
export function useGetMyAddedArtifacts() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ["artifacts", "my-added-artifacts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/artifacts/my-artifacts?email=${user?.email}`,
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });
  return { data, isPending };
}

// Get my liked artifacts
export function useGetMyLikedArtifacts() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["artifacts", "liked-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/liked-artifacts/my-liked-artifacts?email=${user?.email}`,
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  return { data, isPending };
}

// Update my added artifacts
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
