import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Registre from "@/pages/auth/Registre";


const router = createBrowserRouter([
    {
        path:"/",
        Component:Login
    },
    {
        path:"/register",
        Component:Registre
    }
])

export default router;