import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const checkAuth = () => dispatch(actions.authCheckState());
  const userId = useSelector((state) => state.auth.userId);
  const [body, setBody] = useState(null);
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    setBody(
      location.pathname === "/create_chart" ? (
        <Redirect to={{ pathname: "/create_chart" }} />
      ) : (
        <Redirect to={{ pathname: "/view" }} />
      )
    );
  }, [userId]);
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
