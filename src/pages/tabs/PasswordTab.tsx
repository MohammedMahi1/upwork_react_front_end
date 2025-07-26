import { PasswordAlertDialog } from "@/components/content/PasswordAlertDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import Link from "@/components/ui/link";
import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  clearErrorAndMessage,
  updatePasswordAsync,
  userAsync,
} from "@/modules/user/userSlice";

import { useForm, type SubmitHandler } from "react-hook-form";
type PasswordUpdate = {
  current_password: string | null;
  new_password: string | null;
  new_password_confirmation: string | null;
};
const PasswordTab = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, message } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PasswordUpdate>();
  const onSubmit: SubmitHandler<PasswordUpdate> = (data) =>
    dispatch(updatePasswordAsync(data))
      .unwrap()
      .then(() => {
        dispatch(userAsync());
        setValue('current_password',null);
        setValue('new_password',null);
        setValue('new_password_confirmation',null);
        setTimeout(() => {
          dispatch(clearErrorAndMessage());
        }, 5000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(clearErrorAndMessage());
        }, 5000);
      });

  return (
    <TabsContent value="password" className="w-130">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="current-password">Current password</Label>
            <Input
              id="current-password"
              type="password"
              {...register("current_password", {
                required: "Current password is required",
              })}
              error={errors.current_password?.message}
            />
            <PasswordAlertDialog trigger={<Link>Forget Password ?</Link>} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              {...register("new_password", { required: "Set new password" })}
              error={errors.new_password?.message}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="new-password-confirmation">Confirme password</Label>
            <Input
              id="new-password-confirmation"
              type="password"
              {...register("new_password_confirmation", {
                required: "Confirme your new password",
              })}
              error={errors.new_password_confirmation?.message}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            Save password
          </Button>
        </CardFooter>
        {error && (
          <CardFooter>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
        {message && (
          <CardFooter>
            <Alert variant="default">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </TabsContent>
  );
};

export default PasswordTab;
