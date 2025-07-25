import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "@/components/ui/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { otpCancelAsync, otpResendAsync, otpVerifyAsync } from "@/modules/auth/otpSlice";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

const Otp = () => {
  const tokenStorage = localStorage.getItem("token");
  const { isLoading,message } = useAppSelector((state) => state.otp);
  const isVerified = localStorage.getItem("isVerified") === "0";
  const [otps, setOtps] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    dispatch(otpVerifyAsync(otps)).unwrap().then(()=>navigate("/dashboard"));
  };

  return tokenStorage && isVerified ? (
    <Container items="center">
      <Card className="w-1/4">
        <Alert variant={message ? "destructive":"default"}>
          <AlertCircleIcon />
          <AlertTitle>OTP Code</AlertTitle>
            {
            message?
          <AlertDescription>
               {message}
          </AlertDescription>
          :
          <AlertDescription >
               Please enter your OTP to verify your account.
          </AlertDescription>
            }
        </Alert>

          <div className="w-full">
            <InputOTP
              maxLength={6}
              className="w-full"
              onChange={(e: string) => setOtps(e)}
            >
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={0} className="w-full" />
                <InputOTPSlot index={1} className="w-full" />
                <InputOTPSlot index={2} className="w-full" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="w-full">
                <InputOTPSlot index={3} className="w-full" />
                <InputOTPSlot index={4} className="w-full" />
                <InputOTPSlot index={5} className="w-full" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading} onClick={handleSubmit}>
            Submit
          </Button>

        <div className="flex gap-4 text-sm justify-between w-full">
          <Link
            onClick={() => {
              dispatch(otpCancelAsync())
                .unwrap()
                .then(() => navigate("/"));
            }}
          >
            Go back to login
          </Link>
          <Link onClick={()=>dispatch(otpResendAsync())}>Resend code</Link>
        </div>
      </Card>
    </Container>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Otp;
