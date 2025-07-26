import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateForgotedPassowrd } from "@/modules/auth/forgotPassword";
import type { FormType } from "@/modules/auth/types";
import { AlertCircleIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

const ResetPassowrd = () => {
  const { isLoading, error } = useAppSelector((state) => state.resetPassword);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormType>();
    const onSubmit: SubmitHandler<FormType> = (data) =>dispatch(updateForgotedPassowrd({
        ...data,
        token: token ,
        email: email,
    })).unwrap().then(() => {
        navigate("/")
    }).catch((err) => {
        console.log(err);
    });
  return (
    <Container>
      <Card className="w-100">
        <h1 className="text-xl font-semibold">
          Change your password
        </h1>
        {
        error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )
        }
        <Input
          placeholder="Enter Your New Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
        />
        <Input
          placeholder="Confirme Your Password"
          type="password"
          {...register("password_confirmation", {
            required: "Confirme password is required",
          })}
          error={errors.password_confirmation?.message}
        />
        <Button size={"lg"} className="w-full" isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
          Send Reset Link
        </Button>
      </Card>
    </Container>
  );
};

export default ResetPassowrd;
