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
import { otpCancelAsync } from "@/modules/auth/otpSlice";
import { AlertCircleIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Otp = () => {
  const tokenStorage = localStorage.getItem("token");
  const {isLoading} = useAppSelector((state) => state.otp);
  const isVerified = localStorage.getItem("isVerified") === "0";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return tokenStorage && isVerified ? (
    <Container items="center">

    <Card>

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
        <Button className="w-full" isLoading={isLoading}>Submit</Button>
        <div className="flex gap-4 text-sm justify-between w-full">
          <Link onClick={()=>{dispatch(otpCancelAsync()).unwrap().then(()=>navigate("/"))}}>Go back to login</Link>
          <Link>Resend code</Link>
        </div>
    </Card>
    </Container>
  ) : (
    <Navigate to="/" replace />
  );
};

export default Otp;
