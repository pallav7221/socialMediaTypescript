import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useUserData } from "../User/userSlice";

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useUserData();
  return (
    <>
      {user.isLoggedIn ? (
        <Component {...rest} />
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default PrivateRoute;
