import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axios/axiosPublic";

export function useAllArtifact(search = "") {
  const { data, isPending, isError } = useQuery({
    queryKey: ["artifacts", search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/artifacts?search=${search}`);
      return res.data.data;
    },
  });

  return { data, isPending, isError };
}
