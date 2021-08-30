import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
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
          localStorage.setItem("userId", res.data.message.id);
          dispatch(authSuccess(res.data.message.id));
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

export const authCheckState = () => {
  return (dispatch) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      dispatch(logout());
    }else{
      dispatch(authSuccess(userId));

    }
  };
};
