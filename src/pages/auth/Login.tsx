import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormType } from "@/modules/auth/types";
import { asyncLogin } from "@/modules/auth/authSlice";
import { AlertCircleIcon} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {  useNavigate } from "react-router";
import { Card } from "@/components/ui/card";

const Login = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(asyncLogin(data)).unwrap().then(()=>navigate("/user"));

  return (
    <Card className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        <h1 className="text-2xl font-semibold">Get started with login</h1>
        {
          error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )
        }
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <Button type="submit" size={"lg"} className="w-full" isLoading={isLoading}>Login</Button>

        <div className="flex gap-4 text-sm justify-between w-full">
          <Link href="/reset-password">I forget password ?</Link>
          <Link href="/register">I dont have account</Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;
