import { useEffect } from "react";
import LayoutContent from "./hoc/LayoutContent/LayoutContent.jsx";
import CreateCharts from "./container/CreateCharts/CreateCharts.jsx";
import classes from "./App.module.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import * as actions from "./store/actions/index";
import ProtectedRoute from "./hoc/ProtectedRoute/ProtectedRoute";
import Auth from "./container/Auth/Auth.jsx";
import { useTheme } from "./styles/ThemeProvider.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const App = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const token = useSelector((state) => state.auth.token);
  const checked = useSelector((state) => state.auth.checked);
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const setUserData = (userId, token) => dispatch(actions.getUserData(userId, token));
  const checkAuth = () => dispatch(actions.authCheckState());

  useEffect(async () => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (!token && checked) {
      navigate(`/login`);
    }
  }, [token, checked]);

  useEffect(() => {
    if (userId && token) {
      setUserData(userId, token)
    }
  }, [userId, token])
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      if (token && checked) {
        navigate(`/view`);
      }
    }
    else if (location.pathname === '/') {
      if (token && checked) {
        navigate(`/view`);
      } else {
        navigate(`/login`);
      }
    }
  }, [location.pathname, token, checked])
  return (
    <div
      className={classes.AppContainer}
      style={{ backgroundColor: theme.background_color }}
    >
      <Routes>
        {/* <ProtectedRoute path="/" element={<LayoutContent />}></ProtectedRoute> */}
        <Route path="/view" exact element={<LayoutContent />}></Route>
        <Route path="/create_chart" exact element={<CreateCharts />}></Route>
        <Route path="/view/setting" exact element={<LayoutContent />}></Route>
        <Route path="/view/user" exact element={<LayoutContent />}></Route>
        <Route path="/signup" exact element={<Auth />}></Route>
        <Route path="/login" exact element={<Auth />}></Route>
      </Routes>
    </div>
  );
};

export default App;
