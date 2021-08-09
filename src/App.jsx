import React ,{useEffect}from 'react'
import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import CreateCharts from "./container/CreateCharts/CreateCharts.jsx";
import classes from "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute'
import Login from "./container/Auth/Login/Login.js";
import Auth from './container/Auth/Auth.jsx';
import * as actions from './store/actions/index'
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch()
  const authSuccess=(token,userId)=> dispatch(actions.authSuccess(token,userId))
  useEffect(()=>{
    const token=localStorage.getItem('token') 
    // if(token)authSuccess(token,'123')
  },[])
  return (
    <Switch>
      <div className={classes.AppContainer}>
        {/* <Route path="/view" exact component={LayoutContent}></Route>
        <Route path="/create_chart" exact component={CreateCharts}></Route> */}
        <Route path="/signup" exact component={Auth}></Route>
        <Route path="/login" exact component={Login}></Route>
        <ProtectedRoute path='/'  exact component={LayoutContent}></ProtectedRoute>
      </div>
    </Switch>
  );
};

export default App;
