import { createBrowserRouter } from "react-router";
import Index from "@/pages/Index";
import { useAppSelector } from "@/hooks/storeHooks";
import { authRoutes } from "./auth-routes/auth";
const { isAuth } = useAppSelector((state) => state.auth);

const router = createBrowserRouter(
  isAuth ? [{ path: "/", Component: Index }] : authRoutes
);

export default router;
