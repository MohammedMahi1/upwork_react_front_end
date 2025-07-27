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
import ResetPassowrd from "@/pages/auth/ResetPassword";
import ErrorPage from "@/pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    element: <PrivateRouteAuth />,
    children: [{ path: "/dashboard", Component: Dashboard }],
        ErrorBoundary: ErrorPage,
  },
  {
    path: "/otp",
    Component: Otp,
  },
  {
    path: "/update-password",
    Component: ResetPassowrd,
  },
  {
    element: <PrivateRouteGuest />,
    children: [
      {
        path: "/",
        Component: Login,
        ErrorBoundary: ErrorPage,
      },
      {
        path: "/register",
        Component: Registre,
      },
      {
        path: "/reset-password",
        Component: ForgetPassword,
      },
    ],
  },
]);

export default router;
