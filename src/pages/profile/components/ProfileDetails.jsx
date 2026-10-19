import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineFingerPrint,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const ProfileDetails = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const infoItems = [
    {
      icon: <HiOutlineUser className="text-lg text-primaryRed" />,
      label: "Full Name",
      value: user?.displayName || "Not specified",
    },
    {
      icon: <HiOutlineEnvelope className="text-lg text-blue-500" />,
      label: "Email Address",
      value: user?.email || "Not available",
    },
    {
      icon: <HiOutlineShieldCheck className="text-lg text-emerald-500" />,
      label: "Email Status",
      value: user?.emailVerified ? "Verified Account" : "Unverified Account",
      badge: user?.emailVerified ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500",
    },
    {
      icon: <HiOutlineFingerPrint className="text-lg text-purple-500" />,
      label: "User Unique Identifier (UID)",
      value: user?.uid || "N/A",
      isMono: true,
    },
    {
      icon: <HiOutlineCalendarDays className="text-lg text-pink-500" />,
      label: "Member Since",
      value: formatDate(user?.metadata?.creationTime),
    },
    {
      icon: <HiOutlineClock className="text-lg text-amber-500" />,
      label: "Last Sign In",
      value: formatDate(user?.metadata?.lastSignInTime),
    },
    {
      icon: <HiOutlineGlobeAlt className="text-lg text-cyan-500" />,
      label: "Sign-In Method",
      value: user?.providerData?.[0]?.providerId === "google.com" ? "Google Authentication" : "Email & Password",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-3xl bg-white/70 dark:bg-[#0d131f]/60 border border-gray-200/70 dark:border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-white/10 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Account Credential Dossier
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Cryptographic identity and platform session metadata
          </p>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300">
          Sync Status: Live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 flex items-start gap-3.5 hover:border-primaryRed/30 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5 shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                {item.label}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-sm font-semibold text-gray-800 dark:text-gray-100 truncate ${
                    item.isMono ? "font-mono text-xs text-gray-500 dark:text-gray-400" : ""
                  }`}
                >
                  {item.value}
                </p>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${item.badge}`}>
                    {user?.emailVerified ? "Verified" : "Pending"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileDetails;
