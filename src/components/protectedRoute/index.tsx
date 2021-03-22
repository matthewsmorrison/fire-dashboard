import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  let redirectPath = "";
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }
  if (props.isAuthenticated && !props.isAllowed) {
    redirectPath = props.restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};