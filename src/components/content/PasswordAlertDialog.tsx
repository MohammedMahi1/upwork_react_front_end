import {
  AlertDialog,
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
import { useState, type ReactNode } from "react";

type AlertProps = {
  trigger: ReactNode;
};

export function PasswordAlertDialog({ trigger }: AlertProps) {
  const { email } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.resetPassword);
  const [isOPen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const sendForgetPAssowrd = () => {
    if (email) {
      dispatch(sendForgetPassword({ email: email })).unwrap().then(() => {
        setIsOpen(false);
      });
    } else {
      return console.log("Enter your email");
    }
  };
  console.log(email);


  return (
    <AlertDialog open={isOPen} onOpenChange={setIsOpen}>
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
