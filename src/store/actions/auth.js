import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseUrl } from "../../constants/Config";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const getUserData = (userId, token) => {
  return (dispatch) => {
    return axios
      .post(
        `${baseUrl}api/get_user_data`,
        { id: userId },
        { headers: { "auth-token": token } }
      )
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER_DATA,
          user: result.data.message.user,
        });
      });
  };
};
export const setChecked = () => {
  return {
    type: actionTypes.SET_CHECKED,
    checked: true,
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};
export const setUserLabel = (label) => {
  return {
    type: actionTypes.SET_USER_LABEL,
    label,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (username, password, url) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username,
      password,
    };
    axios
      .post(url, authData)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.message.token);
          localStorage.setItem("userId", res.data.message.id);
          dispatch(authSuccess(res.data.message.token, res.data.message.id));
        } else {
          dispatch(authFail(`نام کاربری یا رمز عبور اشتباه می باشد`));
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.message.loginStatus));
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const setHoldignAccess = (holdingAccess) => {
  return {
    type: actionTypes.SET_HOLDING_ACCESS,
    holdingAccess,
  };
};
export const setParentsCharts = (parentsCharts) => {
  return {
    type: actionTypes.SET_PARENTS_CHARTS,
    parentsCharts,
  };
};
export const setSocket = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    socket,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      dispatch(logout());
      dispatch(setChecked());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(setChecked());
    }
  };
};
