import { Navigate, Outlet } from "react-router";

// Web:auth routes
export const PrivateRouteAuth = () => {

  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified") === "1";

  return tokenStorage &&isVerified ?(
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};


// Web:guest routes
export const PrivateRouteGuest = () => {

  const tokenStorage = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified");

  return (tokenStorage && isVerified === "0") ? (<Navigate to="/otp" replace />) : (tokenStorage && isVerified === "1") ? (<Navigate to="/user" replace />) : <Outlet />
  
};
