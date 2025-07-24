import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { asyncRegister } from "@/modules/auth/authSlice";
import type { FormType } from "@/modules/auth/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

const Registre = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) =>
    dispatch(asyncRegister(data))
      .unwrap()
      .then(() => navigate("/user"));
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center"
      >
        <h1 className="text-2xl font-semibold">
          Create you account by fill forms
        </h1>
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
        {...register("confirmPassword", { required: "Confirme password is required" })}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" size={"lg"} className="w-full" is>
          Registre
        </Button>
        <div className="flex gap-4 text-sm justify-between w-full">
          <Link href="/">Already have account</Link>
        </div>
      </form>
    </div>
  );
};

export default Registre;
