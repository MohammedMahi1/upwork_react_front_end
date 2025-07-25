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
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import type { FormType } from "@/modules/auth/types";
import { updateProfileAsync, userAsync } from "@/modules/user/userSlice";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const AccountTab = () => {
  const { email, first_name, last_name, bio,isLoading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(updateProfileAsync(data))
      .unwrap()
      .then(()=>{
        dispatch(userAsync());
        setIsEdit(false)
      });
  

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
                  error={errors.first_name?.message}
                  defaultValue={first_name as string}
                    {...register("first_name")}
                  />
                ) : (
                  <CardDescription>{first_name}</CardDescription>
                )}
              </div>
              <div className="grid gap-3 w-full">
                <Label htmlFor="tabs-demo-last-name">Last name</Label>
                {isEdit ? (
                  <Input id="last-name"
                  error={errors.last_name?.message}
                    defaultValue={last_name as string}
                    {...register("last_name")}
                    />
                ) : (
                  <CardDescription>{last_name}</CardDescription>
                )}
              </div>
            </div>
            {isEdit ? (
              <div className="grid gap-3 w-full">
                <Label>Bio</Label>
                <Textarea
                  maxLength={300}
                  className="h-full max-h-[150px] min-h-[100px]"
                    defaultValue={bio as string}
                    {...register("bio")}
                />
            </div>
            ) : bio ? 
            (
              <div className="grid gap-3 w-full">
                <Label>Bio</Label>
                  <CardDescription>{bio}</CardDescription>
            </div>
            )
            :null}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              {isEdit ? (
                <Input id="email" 
                                  error={errors.email?.message}
                    defaultValue={email as string}
                    {...register("email")}
                />
              ) : (
                <CardDescription>{email}</CardDescription>
              )}
            </div>
        </CardContent>
        <CardFooter>
          {isEdit ? (
            <div className="flex gap-2">
              <Button isLoading={isLoading} variant="default" type="submit" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
              <Button variant="destructive" type="button" onClick={() => setIsEdit(false)}>
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
