import React, { useEffect } from "react";
import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import CreateCharts from "./container/CreateCharts/CreateCharts.jsx";
import classes from "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import Auth from "./container/Auth/Auth.jsx";
import { useTheme } from "./styles/ThemeProvider.js";
const App = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <Switch>
      <div
        className={classes.AppContainer}
        style={{ backgroundColor: theme.background_color }}
      >
        <ProtectedRoute path="/"  component={LayoutContent}></ProtectedRoute>
        <Route path="/view" exact component={LayoutContent}></Route>
        <Route path="/create_chart" exact component={CreateCharts}></Route>
        <Route path="/view/setting" exact component={LayoutContent}></Route>
        <Route path="/signup" exact component={Auth}></Route>
        <Route path="/login" exact component={Auth}></Route>
      </div>
    </Switch>
  );
};

export default App;
