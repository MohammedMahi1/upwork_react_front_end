import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Registre from "@/pages/auth/Registre";
import ForgetPassword from "@/pages/auth/ForgetPassword";


const router = createBrowserRouter([
    {
        path:"/",
        Component:Login
    },
    {
        path:"/register",
        Component:Registre
    },
    {
        path:"/reset-password",
        Component:ForgetPassword
    }
])

export default router;