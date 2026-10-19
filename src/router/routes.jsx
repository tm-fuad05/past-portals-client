import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Auth from "../pages/authentication/Auth";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/home/Home";
import AllArtifacts from "../pages/artifacts/AllArtifacts";
import AddArtifacts from "../pages/artifacts/AddArtifacts";
import PrivateLayout from "../private-layout/PrivateLayout";
import ArtifactDetails from "../pages/artifacts/ArtifactDetails";
import ErrorPage from "../pages/error/ErrorPage";
import MyArtifacts from "../pages/my-artifacts/MyArtifacts";
import MyLikedArtifacts from "../pages/my-artifacts/MyLikedArtifacts";
import Profile from "../pages/profile/Profile";
import AboutUs from "../pages/about/AboutUs";
import ScrollToTop from "./ScrollToTop";
import ReactLenis from "lenis/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
          <ScrollToTop />
          <Root />
        </ReactLenis>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/artifacts",
        element: <AllArtifacts />,
      },
      {
        path: "/artifacts/:name/:id",
        element: <ArtifactDetails />,
      },
      {
        path: "/add-artifact",
        element: (
          <PrivateLayout>
            <AddArtifacts />
          </PrivateLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateLayout>
            <Profile />
          </PrivateLayout>
        ),
      },
      {
        path: "/my-artifacts",
        element: (
          <PrivateLayout>
            <MyArtifacts />
          </PrivateLayout>
        ),
      },
      {
        path: "/my-liked-artifacts",
        element: (
          <PrivateLayout>
            <MyLikedArtifacts />
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
    element: (
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        <Auth />
      </ReactLenis>
    ),
    children: [
      {
        path: "/auth/sign-in",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
