import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/storeHooks";
import { useState } from "react";

const AccountTab = () => {
  const { email, first_name, last_name, bio } = useAppSelector(
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
              {isEdit ? (
                <Input id="last-name" defaultValue={last_name as string} />
              ) : (
                <CardDescription>{last_name}</CardDescription>
              )}
            </div>
          </div>
          {isEdit ? (
            <div className="grid gap-3 w-full">
              <Label>Bio</Label>
              <Textarea placeholder={bio as string} maxLength={300}className="h-full max-h-[150px] min-h-[100px]"/>
            </div>
          ) : (
            bio
          )}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            {isEdit ? (
              <Input id="email" defaultValue={email as string} />
            ) : (
              <CardDescription>{email}</CardDescription>
            )}
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
export default AccountTab;
