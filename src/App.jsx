import { useEffect, useState } from "react";
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
import { baseUrl } from "./constants/Config.js";
import * as authActions from "./store/actions/auth";
import * as holdingActions from "./store/actions/holdingDetail";

import socketIOClient from "socket.io-client";
import { getUserHoldings } from "./api/home.js";
import ErrorDialog from "./component/UI/Error/ErrorDialog.jsx";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const checked = useSelector((state) => state.auth.checked);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const themeState = useTheme();
  const theme = themeState.computedTheme;


  const setSocket = (socket) => {
    dispatch(authActions.setSocket(socket));
  };
  const setUserData = (userId, token) => dispatch(actions.getUserData(userId, token));
  const checkAuth = () => dispatch(actions.authCheckState());

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        checkAuth();
        setSocket(socketIOClient(baseUrl))

        controller = null
      } catch (error) {
      }
    })()
    return () => controller?.abort()
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


  const setHoldings = (holdings) => {
    dispatch(holdingActions.setHoldings(holdings));
  };
  const setHoldingAccess = (info) => {
    dispatch(authActions.setHoldignAccess(info));
  };
  const setSelectedHolding = (info) => {
    dispatch(holdingActions.setHoldingInfo(info));
  };
  useEffect(() => {
    let controller = new AbortController();
    if (token && userId) {
      (async () => {
        try {
          setLoading(true)
          const result = await getUserHoldings(userId, token)
          if (result.success) {
            setHoldings(result.data)
            if (result.data.length > 0)
              setSelectedHolding(result.data[0])
            else {
              setError(null)
              setError(<ErrorDialog type="error">{result.error}</ErrorDialog>)
            }
          } else {
            setError(null)
            setError(<ErrorDialog type="error">{result.error}</ErrorDialog>)
          }
          setLoading(false)
          controller = null
        } catch (e) {
          // Handle fetch error
        }
      })();
    }
    return () => controller?.abort();
  }, [token, userId])

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
