import { Navigate, Outlet } from "react-router";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/provider-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// Web:auth routes
export const PrivateRouteAuth = () => {
  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified") === "1";

  return tokenStorage && isVerified ? <Outlet /> : <Navigate to="/" replace />;
};

// Web:guest routes
export const PrivateRouteGuest = () => {
  const { setTheme } = useTheme();
  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified");

  return tokenStorage && isVerified === "0" ? (
    <Navigate to="/otp" replace />
  ) : tokenStorage && isVerified === "1" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <Outlet />
      <div className="absolute top-[90%] left-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
