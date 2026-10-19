import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axios/axiosPublic";

export function useHighestLikedArtifact() {
  const { data, isPending } = useQuery({
    queryKey: ["artifacts", "highest-liked"],
    queryFn: async () => {
      const res = await axiosPublic.get("/artifacts/highest-like-count");
      return res.data.data;
    },
  });
  return { data, isPending };
}
