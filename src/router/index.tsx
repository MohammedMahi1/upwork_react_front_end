import { createBrowserRouter } from "react-router";
import Index from "@/pages/Index";
import Registre from "@/pages/auth/Registre";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import Login from "@/pages/auth/Login";
import { PrivateRouteAuth, PrivateRouteGuest} from "@/components/content/PrivateRoute";

const router = createBrowserRouter(
  [
    {
      element: <PrivateRouteAuth />,
      children: [
        { path: "/user", Component: Index },
      ],
    },
{  
  
  element: <PrivateRouteGuest />,
  children:
[  {
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
    }]}
  ] ,
  
);

export default router;
