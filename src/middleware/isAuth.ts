import React from "react";
import { useNavigate } from "react-router";
function isAuth(): boolean {
  return !!localStorage.getItem("isAuth");
}
const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!isAuth()) {
        navigate("/login");
      }
    }, [navigate]);

    return isAuth() ? React.createElement(Component, props) : null;
  };

  return ComponentWithAuth;
};

export default withAuth;