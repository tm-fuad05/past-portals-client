import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useLikeArtifact } from "./useLikeArtifact";

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
