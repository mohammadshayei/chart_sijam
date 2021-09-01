import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const checkAuth = () => dispatch(actions.authCheckState());
  useEffect(() => {
    checkAuth();
  }, []);
  const userId = localStorage.getItem("userId");
  const body =
    location.pathname === "/create_chart" ? (
      <Redirect to={{ pathname: "/create_chart" }} />
    ) : (
      <Redirect to={{ pathname: "/view" }} />
    );

  const cmp = (
    <Route
      {...rest}
      render={(props) =>
        userId ? body : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
  return cmp;
};

export default ProtectedRoute;
