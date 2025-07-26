import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { sendForgetPassword } from "@/modules/auth/forgotPassword";
import type { FormType } from "@/modules/auth/types";
import { AlertCircleIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

const ForgetPassword = () => {
  const { isLoading, error, message } = useAppSelector(
    (state) => state.resetPassword
  );

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(sendForgetPassword(data));
  return (
    <Container>
      <Card className="w-1/4">
        <h1 className="text-xl font-semibold">
          You will resive a link on your email !
        </h1>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {message && (
          <Alert variant="default">
            <AlertCircleIcon />
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}

        <Input
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Button size={"lg"} className="w-full" isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
          Send Reset Link
        </Button>
        <div className="flex gap-4 text-sm justify-between w-full">
          <Link href="/">Back to Login</Link>
          <Link href="/register">I dont have account</Link>
        </div>
      </Card>
    </Container>
  );
};

export default ForgetPassword;
