import React, { useEffect } from "react";
import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import CreateCharts from "./container/CreateCharts/CreateCharts.jsx";
import classes from "./App.module.scss";
import { Route, Switch, useLocation } from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import Auth from "./container/Auth/Auth.jsx";
import * as actions from "./store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Login from "./container/Auth/LoginTR/Login.js";
import { useTheme } from "./styles/ThemeProvider.js";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = () => dispatch(actions.authCheckState());
  useEffect(() => {
    checkAuth();
  }, []);
  const userId = useSelector((state) => state.auth.userId);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <Switch>
      <div
        className={classes.AppContainer}
        style={{ backgroundColor: theme.background_color }}
      >
        <Route path="/view" exact component={LayoutContent}></Route>
        {/* <ProtectedRoute path="/"  component={LayoutContent}></ProtectedRoute> */}
        <Route path="/create_chart" exact component={CreateCharts}></Route>
        <Route path="/signup" exact component={Auth}></Route>
        <Route path="/login" exact component={Auth}></Route>
      </div>
    </Switch>
  );
};

export default App;
