import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import NotFound from "../pages/NotFound";
import AllVisas from "../pages/visas/AllVisas";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AddVisa from "../pages/visas/AddVisa";
import VisaDetails from "../pages/visas/VisaDetails";
import MyAddedVisas from "../pages/visas/MyAddedVisas";
import MyVisaApplications from "../pages/visas/MyVisaApplications";
import PrivateRoute from "./PrivateRoute";

const API_URL = import.meta.env.VITE_API_URL;

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-visas",
        element: <AllVisas />,
        loader: async () => {
          const res = await fetch(`${API_URL}/visas`);
          return res.json();
        },
      },
      {
        path: "visa/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`${API_URL}/visas/${params.id}`);
          return res.json();
        },
      },
      {
        path: "add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisas />
          </PrivateRoute>
        ),
      },
      {
        path: "my-visa-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplications />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
