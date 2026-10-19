import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../axios/useAxiosSecure";
import { useAuth } from "../../provider/AuthProvider";

export function useMyLikedArtifacts() {
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
