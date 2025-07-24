import { useAppSelector } from "@/hooks/storeHooks";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

// Web:auth routes
export const PrivateRouteAuth = () => {
    const navigate = useNavigate()
  const tokenStorage = localStorage.getItem("token");
  const isVerify  = useAppSelector((state) => state.user.is_verify);
  useEffect(()=>{
    if (tokenStorage && isVerify === 0) {
     navigate("/otp");
    }
  },[isVerify, tokenStorage])

  return tokenStorage ?(
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
// Web:guest routes
export const PrivateRouteGuest = () => {
  const { is_verify } = useAppSelector((state) => state.user);
  const tokenStorage = localStorage.getItem("token");
  console.log(is_verify);

  return tokenStorage ? (
    <Navigate to="/user" replace />
  ) : (
    <Outlet />
  );
};
