import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

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
