import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";

// Get All artifect
export function useGetAllArtifact(search = "") {
  const { data, isPending, isError } = useQuery({
    queryKey: ["artifacts", search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/artifacts?search=${search}`);
      return res.data.data;
    },
  });

  return { data, isPending, isError };
}

// Get artifect By Id
export function useGetArtifactById(id) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["artifacts", "details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/artifacts/${id}`);
      return res.data.data;
    },
  });

  return { data, isPending, isError };
}

// Get Highest Liked Artifacts
export function useGetHighestLikedArtifact() {
  const { data, isPending } = useQuery({
    queryKey: ["artifacts", "highest-liked"],
    queryFn: async () => {
      const res = await axiosPublic.get("/artifacts/highest-like-count");
      return res.data.data;
    },
  });
  return { data, isPending };
}

// Add Artifact
export function useAddArtifact(formRef, setPreviewUrl) {
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
        setPreviewUrl(null);
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

export function useDeleteArtifact() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/artifacts/${id}`);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await Swal.fire({
          title: data?.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries({ queryKey: ["artifacts"] });
      }
    },
  });
  return deleteMutation;
}

// Like an Artifact
export function useLikeArtifact() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const patchMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/artifacts/like/${id}`);
      return res?.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["artifacts"],
        });
      }
    },
  });
  return patchMutation;
}

// Instant Like Visible
export function useInstantLike(artifact) {
  const { user } = useAuth();
  const likeMutation = useLikeArtifact();

  const [isLiked, setIsLiked] = useState(
    artifact?.likedBy?.includes(user?.email),
  );
  const [likesCount, setLikesCount] = useState(artifact?.likedBy?.length || 0);

  useEffect(() => {
    setIsLiked(artifact?.likedBy?.includes(user?.email));
    setLikesCount(artifact?.likedBy?.length || 0);
  }, [artifact, user?.email]);

  const handleLike = (id) => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    likeMutation.mutate(id);
  };

  return { isLiked, likesCount, handleLike };
}
