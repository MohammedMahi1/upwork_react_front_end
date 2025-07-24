
import ForgetPassword from "@/pages/auth/ForgetPassword";
import Login from "@/pages/auth/Login";
import Registre from "@/pages/auth/Registre";


export const authRoutes = [
    {
        path:"/register",
        Component:Registre
    },
    {
        path:"/reset-password",
        Component:ForgetPassword
    },
    {
        path:"/login",
        Component:Login
    }
]