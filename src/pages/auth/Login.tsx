import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import Spinner from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormType } from "@/modules/auth/types";
import { asyncLogin } from "@/modules/auth/authSlice";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(asyncLogin(data));

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center"
      >
        <h1 className="text-2xl font-semibold">Get started with login</h1>
        {
          error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
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

        <Button type="submit" size={"lg"} className="w-full">
          {isLoading ? <Spinner /> : "Login"}
        </Button>

        <div className="flex gap-4 text-sm justify-between w-full">
          <Link href="/reset-password">I forget password ?</Link>
          <Link href="/register">I dont have account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
