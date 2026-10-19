import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useAuth } from "../../provider/AuthProvider";

export function useMyAddedArtifacts() {
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
