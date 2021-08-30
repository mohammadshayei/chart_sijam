import React from "react";
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userId = useSelector((state) => state.auth.userId);
  console.log(userId)
  const cmp = (
    <Route
      {...rest}
      render={(props) =>
        userId  ? (
          <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
  return cmp;
};

export default ProtectedRoute;
