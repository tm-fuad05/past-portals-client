/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { FcGoogle } from "react-icons/fc";

export function SocialLogin({ setAuthError }) {
  const { signInWithGoogle, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInwithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Signed In",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 1200);
      })
      .catch(() => {
        setAuthError("Google sign-in failed");
      });
  };

  return (
    <button
      type="button"
      onClick={handleSignInwithGoogle}
      className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all shadow-sm"
    >
      <FcGoogle className="text-lg" />
      <span className="uppercase tracking-wider text-xs">
        Sign in with Google
      </span>
    </button>
  );
}
