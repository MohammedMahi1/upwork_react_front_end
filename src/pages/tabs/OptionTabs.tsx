import { useNavigate } from "react-router";
import { asyncLogout } from "@/modules/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/storeHooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/provider-theme";
import { Label } from "@/components/ui/label";

const ThemeMenue = () => {
  const { setTheme } = useTheme();
  return (
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
  );
};

const OptionTab = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <TabsContent value="options" className="w-130">
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Manage your application settings here.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="flex justify-between">
                <Label>Theme Mode</Label>
                <ThemeMenue />
            </div>
        </CardContent>
                  <CardFooter>
            <Button
              variant="destructive"
              onClick={() =>
                dispatch(asyncLogout())
                  .unwrap()
                  .then(() => {
                    navigate("/");
                  })
              }
              className="w-fit"
            >
              Logout
            </Button>
          </CardFooter>
      </Card>
    </TabsContent>
  );
};
export default OptionTab;
