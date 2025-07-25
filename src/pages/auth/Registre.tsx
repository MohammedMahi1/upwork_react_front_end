import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { asyncRegister } from "@/modules/auth/authSlice";
import type { FormType } from "@/modules/auth/types";
import { AlertCircleIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const Registre = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  console.log(error);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(asyncRegister(data))
      .unwrap()
      .then(() => navigate("/otp"));
  return (
    <Container >
      <Card className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center"
        >
          <h1 className="text-2xl font-semibold">
            Create you account by fill forms
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
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
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
          <Button
            type="submit"
            size={"lg"}
            className="w-full"
            isLoading={isLoading}
          >
            Registre
          </Button>
          <div className="flex gap-4 text-sm justify-between w-full">
            <Link href="/">Already have account</Link>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default Registre;
