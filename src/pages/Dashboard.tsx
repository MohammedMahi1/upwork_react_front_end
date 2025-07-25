import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { asyncLogout } from "@/modules/auth/authSlice";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const OptionTab = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <TabsContent value="option" className="w-130">
      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Change your password here. After saving, youll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
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
        </CardContent>
      </Card>
    </TabsContent>
  );
};
const PasswordTab = () => {
  return (
    <TabsContent value="password" className="w-130">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tabs-demo-new">New password</Label>
            <Input id="tabs-demo-new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
const DashboardTab = () => {
  const { email, first_name, last_name } = useAppSelector(
    (state) => state.user
  );
  const [isEdit, setIsEdit] = useState(false);
  return (
    <TabsContent value="account" className="w-130">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 ">
          <div className="flex flex-row gap-2 w-full">
            <div className="grid gap-3 w-full">
              <Label htmlFor="tabs-demo-first-name">First name</Label>
              {isEdit ? (
                <Input
                  id="tabs-demo-first-name"
                  defaultValue={first_name as string}
                />
              ) : (
                <CardDescription>{first_name}</CardDescription>
              )}
            </div>
            <div className="grid gap-3 w-full">
              <Label htmlFor="tabs-demo-last-name">Last name</Label>
              {
                isEdit ? 
              <Input id="last-name" defaultValue={last_name as string} />
                :
                <CardDescription>{last_name}</CardDescription>

              }
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            {isEdit ? <Input id="email" defaultValue={email as string} />:<CardDescription>{email}</CardDescription>}
          </div>
        </CardContent>
        <CardFooter>
          {isEdit ? (
            <div className="flex gap-2">
              <Button variant="default" onClick={() => setIsEdit(false)}>
                Save
              </Button>
              <Button variant="destructive" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEdit(true)}>
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userAsync());
  }, [dispatch]);
  return (
    <Container>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="option">option</TabsTrigger>
        </TabsList>
        <DashboardTab />
        <PasswordTab />
        <OptionTab />
      </Tabs>
    </Container>
  );
};

export default Dashboard;
