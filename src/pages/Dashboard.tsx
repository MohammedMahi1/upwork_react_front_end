
import Container from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/storeHooks";
import { userAsync } from "@/modules/user/userSlice";
import { useEffect } from "react";
import OptionTab from "./tabs/OptionTabs";
import PasswordTab from "./tabs/PasswordTab";
import AccountTab from "./tabs/AccountTabs";

import { useTheme } from "@/theme/provider-theme";

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
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="option">option</TabsTrigger>
        </TabsList>
        <AccountTab />
        <PasswordTab />
        <OptionTab />
      </Tabs>
    </Container>
  );
};

export default Dashboard;
