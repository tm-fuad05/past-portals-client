import { motion } from "framer-motion";
import CardSkelton from "../../../components/shared/CardSkelton";
import { useGetHighestLikedArtifact } from "../../../hooks/useArtifact";
import { MotionAnimation } from "../../../animation/motion.animation";
import ArtifactCard from "../../artifacts/components/ArtifactCard";

const HighestLike = () => {
  const { data: highestLikedData, isPending } = useGetHighestLikedArtifact();

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      {/* Animated Minimalist Heading Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-3 text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primaryRed/10 to-lightRed/5 border border-primaryRed/20 dark:border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-primaryRed uppercase">
            Trending Nodes
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-gray-900 dark:text-white">
          Highest Like{" "}
          <span className="inline-block bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
            Artifacts
          </span>
        </h2>
      </motion.div>

      {/* Grid Wrapper with Stagger Configuration or Skeleton */}
      {isPending ? (
        <CardSkelton count={6} />
      ) : highestLikedData?.length > 0 ? (
        <motion.div
          variants={MotionAnimation.parentContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {highestLikedData?.map((artifact) => (
            <motion.div key={artifact?._id} variants={MotionAnimation.cardNode}>
              <ArtifactCard artifact={artifact} />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};

export default HighestLike;
