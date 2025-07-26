import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { sendForgetPassword } from "@/modules/auth/forgotPassword";
import { Label } from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

type AlertProps = {
  trigger: ReactNode;
};

export function PasswordAlertDialog({ trigger }: AlertProps) {
  const { email } = useAppSelector((state) => state.user);
  const { isLoading, error, message } = useAppSelector((state) => state.resetPassword);

  const dispatch = useAppDispatch();
  const sendForgetPAssowrd = () => {
    if (email) {
      dispatch(sendForgetPassword({ email: email }));
    } else {
      return console.log("Enter your email");
    }
  };
  console.log(email);


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will send a link on your <span className="underline">{email}</span><br />checkout your mail after
            action
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={sendForgetPAssowrd} isLoading={isLoading}>
            Send
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
