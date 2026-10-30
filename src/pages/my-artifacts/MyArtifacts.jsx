import MyArtifactCard from "./components/MyArtifactCard";
import empty from "../../assets/empty.jpg";
import CardSkelton from "../../components/shared/CardSkelton";
import { motion } from "framer-motion";
import { useGetMyAddedArtifacts } from "../../hooks/useMyArtifact";
import { MotionAnimation } from "../../animation/motion.animation";

const MyArtifacts = () => {
  const { data: myAddedArtifacts, isPending } = useGetMyAddedArtifacts();

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Header Stat Board */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 dark:border-white/10 pb-6 mb-10"
      >
        <div>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-900 dark:text-white">
            My{" "}
            <span className="inline-block bg-gradient-to-r from-redStart to-redEnd bg-clip-text text-transparent">
              Artifacts
            </span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
            Personal archival repository and registered artifact terminal
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 rounded-2xl-2xl shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-primaryRed animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-gray-700 dark:text-gray-300 uppercase">
            Total Artifact: {myAddedArtifacts?.length}
          </span>
        </div>
      </motion.div>

      {/* Empty State vs Grid Interface Animate Handler */}
      {isPending ? (
        <CardSkelton count={6} />
      ) : myAddedArtifacts?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto my-20 text-center space-y-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl shadow-black/[0.02]">
            <img
              src={empty}
              alt="No Nodes Registered"
              className="w-full opacity-90 dark:opacity-75 contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-slate-950 dark:via-transparent" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-tight">
            No Data Found
          </h3>
        </motion.div>
      ) : (
        <motion.div
          variants={MotionAnimation.parentContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {myAddedArtifacts?.map((myArtifact) => (
            <motion.div
              key={myArtifact?._id}
              variants={MotionAnimation.cardNode}
            >
              <MyArtifactCard
                myArtifact={myArtifact}
                myAddedArtifacts={myAddedArtifacts}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyArtifacts;
