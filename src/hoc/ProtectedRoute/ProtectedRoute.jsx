import React, { useEffect, useState } from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const checkAuth = () => dispatch(actions.authCheckState());
  const auth = useSelector((state) => state.auth);
  const setUserData = (userId, token) => dispatch(actions.getUserData(userId, token));

  const navigate = useNavigate()
  const [body, setBody] = useState(null);
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    setBody(
      location.pathname === "/create_chart" ?
        navigate('/create_chart')
        :
        navigate('/view')

    );
    if (auth.userId && auth.token) {
      setUserData(auth.userId, auth.token)
    }
  }, [auth.token, auth.userId]);
  const cmp = (
    <Route
      {...rest}
      render={(props) =>
        auth.userId && auth.token ? <Component {...rest} /> : navigate('/login')
      }
    />
  );
  return cmp;
};

export default ProtectedRoute;
