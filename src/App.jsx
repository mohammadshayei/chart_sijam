import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import classes from "./App.module.scss";
const App = () => {
  return (
    <div className={classes.AppContainer}>
      <LayoutContent />
    </div>
  );
};

export default App;
