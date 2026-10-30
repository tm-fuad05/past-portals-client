/* eslint-disable react/prop-types */

const SingleCardSkeleton = () => {
  return (
    <div className="h-full rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-80 md:h-72 bg-gray-200/80 dark:bg-slate-800/80 relative" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
          {/* Title line */}
          <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded-md w-3/5" />
          {/* Badge */}
          <div className="h-5 bg-gray-200/70 dark:bg-slate-800/70 rounded-full w-16" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 flex-grow pt-1">
          <div className="h-3.5 bg-gray-200/80 dark:bg-slate-800/70 rounded w-full" />
          <div className="h-3.5 bg-gray-200/60 dark:bg-slate-800/50 rounded w-4/5" />
        </div>

        {/* Discoverer / metadata */}
        <div className="border-t border-gray-100 dark:border-white/5 pt-4">
          <div className="h-3.5 bg-gray-200/70 dark:bg-slate-800/60 rounded w-1/2" />
        </div>
      </div>

      {/* Bottom Action Skeleton */}
      <div className="flex items-center justify-between px-6 pb-6 pt-3 border-t border-gray-100 dark:border-white/5">
        <div className="h-8 bg-gray-200/70 dark:bg-slate-800/60 rounded-full w-16" />
        <div className="h-8 bg-gray-200/70 dark:bg-slate-800/60 rounded-full w-24" />
      </div>
    </div>
  );
};

const CardSkelton = ({ count = 6, variant = "grid" }) => {
  if (variant === "list") {
    return (
      <div className="flex flex-col gap-4 w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row gap-5 p-4 sm:p-5 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl animate-pulse overflow-hidden"
          >
            <div className="w-full md:w-3/12 h-52 md:h-36 rounded-2xl bg-gray-200/80 dark:bg-slate-800/80 shrink-0" />
            <div className="flex flex-col justify-center flex-grow space-y-3.5 py-1">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-20" />
                <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="h-4 bg-gray-200/70 dark:bg-slate-800/60 rounded w-32" />
                <div className="h-4 bg-gray-200/70 dark:bg-slate-800/60 rounded w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <SingleCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardSkelton;
