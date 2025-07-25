import { createBrowserRouter } from "react-router";
import Registre from "@/pages/auth/Registre";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import Login from "@/pages/auth/Login";
import {
  PrivateRouteAuth,
  PrivateRouteGuest,
} from "@/components/content/PrivateRoute";
import Otp from "@/pages/auth/Otp";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
  {
    element: <PrivateRouteAuth />,
    children: [{ path: "/dashboard", Component: Dashboard }],
  },
  {
    path: "/otp",
    Component: Otp,
  },
  {
    element: <PrivateRouteGuest />,
    children: [
      {
        path: "/register",
        Component: Registre,
      },
      {
        path: "/reset-password",
        Component: ForgetPassword,
      },
      {
        path: "/",
        Component: Login,
      },
    ],
  },
]);

export default router;
