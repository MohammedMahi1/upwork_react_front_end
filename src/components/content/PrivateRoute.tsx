import { Navigate, Outlet } from "react-router";


// Web:auth routes
export const PrivateRouteAuth = () => {
  const tokenStorage = localStorage.getItem("token" );
  return tokenStorage ? <Outlet /> : <Navigate to="/" replace />;
};


// Web:guest routes
export const PrivateRouteGuest = () => {
  const tokenStorage = localStorage.getItem("token" );
  return tokenStorage ? <Navigate to="/user" replace />:<Outlet /> ;
};

