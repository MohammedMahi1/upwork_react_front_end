import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "@/components/ui/link";
import { useAppDispatch } from "@/hooks/storeHooks";
import { otpCancelAsync } from "@/modules/auth/otpSlice";
import { AlertCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Otp = () => {
  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified") === "0";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return tokenStorage && isVerified ? (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className='flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center'>
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>OTP Page</AlertTitle>
          <AlertDescription>Please enter your OTP to verify your account.</AlertDescription>
        </Alert>
        <div className="w-full">
          <InputOTP maxLength={6} className="w-full">
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={0} className="w-full"/>
              <InputOTPSlot index={1} className="w-full"/>
              <InputOTPSlot index={2} className="w-full"/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={3} className="w-full"/>
              <InputOTPSlot index={4} className="w-full"/>
              <InputOTPSlot index={5}className="w-full"/>
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full">Submit</Button>
        <div className="flex gap-4 text-sm justify-between w-full">
          <Link onClick={()=>{dispatch(otpCancelAsync())}}>Go back to login</Link>
          <Link>Resend code</Link>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Otp;
