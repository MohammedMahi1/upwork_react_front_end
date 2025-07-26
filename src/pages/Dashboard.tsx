
import Container from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/storeHooks";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect } from "react";
import OptionTab from "./tabs/OptionTabs";
import PasswordTab from "./tabs/PasswordTab";
import AccountTab from "./tabs/AccountTabs";
import MyJobs from "./tabs/MyJobs";


const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAsync());
  }, [dispatch]);
  return (
    <Container>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>
        <AccountTab />
        <PasswordTab />
        <OptionTab />
        <MyJobs/>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
