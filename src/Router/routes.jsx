import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import Auth from "../Components/Authentication/Auth";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Home from "../Pages/Home";
import AllArtifacts from "../Pages/AllArtifacts";
import AddArtifacts from "../Pages/AddArtifacts";
import PrivateLayout from "../PrivateLayout/PrivateLayout";
import ArtifactDetails from "../Pages/ArtifactDetails";
import ErrorPage from "../Pages/ErrorPage";
import MyArtifacts from "../Pages/MyArtifacts";
import MyLikedArtifacts from "../Pages/MyLikedArtifacts";
import AboutUs from "../Pages/AboutUs";
import ScrollToTop from "./ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Root />
      </>
    ),
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
        path: "/artifact/:name/:id",
        element: (
          <PrivateLayout>
            <ArtifactDetails></ArtifactDetails>
          </PrivateLayout>
        ),
        loader: ({ params }) =>
          fetch(
            `https://pastportals-server.vercel.app/each-artifact-details/${params.id}`
          ),
      },
      {
        path: "/add-artifacts",
        element: (
          <PrivateLayout>
            <AddArtifacts></AddArtifacts>
          </PrivateLayout>
        ),
      },
      {
        path: "/my-artifacts",
        element: (
          <PrivateLayout>
            <MyArtifacts></MyArtifacts>
          </PrivateLayout>
        ),
      },
      {
        path: "/my-liked-artifacts",
        element: (
          <PrivateLayout>
            <MyLikedArtifacts></MyLikedArtifacts>
          </PrivateLayout>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs />,
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
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
