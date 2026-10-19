import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // if (loader) return <Loader />;
  if (user?.email) return navigate("/");

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Auth;
