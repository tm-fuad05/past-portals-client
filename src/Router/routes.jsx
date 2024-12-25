import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import Auth from "../Components/Authentication/Auth";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Home from "../Pages/Home";
import AllArtifacts from "../Pages/AllArtifacts";
import AddArtifacts from "../Pages/AddArtifacts";
import PrivateLayout from "../PrivateLayout/PrivateLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-artifacts",
        element: <AllArtifacts></AllArtifacts>,
      },
      {
        path: "/add-artifacts",
        element: (
          <PrivateLayout>
            <AddArtifacts></AddArtifacts>
          </PrivateLayout>
        ),
      },
    ],
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
