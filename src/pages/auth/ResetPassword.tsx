import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import Spinner from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateForgotedPassowrd } from "@/modules/auth/forgotPassword";
import type { FormType } from "@/modules/auth/types";
import type { ResetPasswordParams } from "@/types/ResetPasswordParams";
import { AlertCircleIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";

const ResetPassowrd = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
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
        token: token as string,
        email: email as string,
    })).then(() => {
      navigate("/");
    });
  return (
    <Container>
      <Card className="w-100">
        <h1 className="text-xl font-semibold">
          Change your password
        </h1>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
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
