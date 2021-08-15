import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  localStorage.setItem("token", token);
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (username, password, isSignUp) => {
  //   return dispatch => {
  //       // ....
  //       dispatch(authStart());
  //       const authData = {
  //           email: email,
  //           password: password,
  //           returnSecureToken: true
  //       }
  //       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJMNCZgDCNgPUQnvuIwGPqHNKyUQX_x0A';
  //       if(!isSignUp) {
  //           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJMNCZgDCNgPUQnvuIwGPqHNKyUQX_x0A'
  //       }
  //       axios.post(url, authData)
  //           .then(res => {
  //               const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
  //               localStorage.setItem('token' , res.data.idToken)
  //               localStorage.setItem('expirationDate' , expirationDate)
  //               localStorage.setItem('userId' , res.data.localId)
  //               dispatch(authSuccess(res.data.idToken , res.data.localId));
  //               dispatch(checkAuthTimeout(res.data.expiresIn));
  //           })
  //           .catch(err => {
  //               dispatch(authFail(err.response.data.error));
  //           })
  //   }
  return (dispatch) => {
    dispatch(authSuccess("token", "userID"));
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
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationDate"));
      if (expirationTime.getTime() >= new Date().getTime()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
