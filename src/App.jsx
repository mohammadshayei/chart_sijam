import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import CreateCharts from "./container/CreateCharts/CreateCharts.jsx";
import classes from "./App.module.scss";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <div className={classes.AppContainer}>
        <Route path="/view" exact component={LayoutContent}></Route>
        <Route path="/create_chart" exact component={CreateCharts}></Route>

      </div>
    </Switch>
  );
};

export default App;
