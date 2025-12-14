import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default Router;