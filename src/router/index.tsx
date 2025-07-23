import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";


const router = createBrowserRouter([
    {
        path:"/",
        Component:Login
    }
])

export default router;