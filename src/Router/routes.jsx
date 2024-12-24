import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import Auth from "../Components/Authentication/Auth";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
  {
    path: "/auth",
    element: <Auth></Auth>,
    children: [
      {
        path: "/auth/sign-in",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
