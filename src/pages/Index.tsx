import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { asyncLogout } from "@/modules/auth/authSlice";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, id, name } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(userAsync());
  }, [dispatch]);
  return (
    <Container>
      <Card>
        <h1 className="text-2xl font-semibold">Welcome to the Index Page</h1>
        <p className="mt-4">User ID: {id}</p>
        <p className="mt-2">User Name: {name}</p>
        <p className="mt-2">User Email: {email}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-fit">
              Open
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                dispatch(asyncLogout())
                  .unwrap()
                  .then(() => {
                    navigate("/");
                  })
              }
              variant="destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </Container>
  );
};

export default Index;
