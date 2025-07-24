import { createBrowserRouter } from "react-router";
import Index from "@/pages/Index";
import Registre from "@/pages/auth/Registre";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import Login from "@/pages/auth/Login";
import PrivateRoute from "@/components/content/PrivateRoute";

const router = createBrowserRouter(
  [
    {
      element: <PrivateRoute />,
      children: [
        { path: "/user", Component: Index },
      ],
    },
    {
        path:"/register",
        Component:Registre
    },
    {
        path:"/reset-password",
        Component:ForgetPassword
    },
    {
        path:"/",
        Component:Login
    }
  ] ,
  
);

export default router;
