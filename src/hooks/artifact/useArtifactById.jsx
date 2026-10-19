import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axios/axiosPublic";

export function useArtifactById(id) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["artifacts", "details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/artifacts/${id}`);
      return res.data.data;
    },
  });

  return { data, isPending, isError };
}
