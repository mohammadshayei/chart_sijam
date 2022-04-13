import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  user: null,
  error: null,
  socket: null,
  loading: false,
  authRedirectPath: null,
  label: {
    customization: false,
    users: false,
    permissions: false,
    chart: false,
    name: "",
    _id: "",
  },
  checked: false,
  holdingAccess: [],
  parentsCharts: [],
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const setUserData = (state, action) => {
  return updateObject(state, {
    user: action.user,
  });
};
const setSocket = (state, action) => {
  return updateObject(state, { socket: action.socket });
};
const setUserLabel = (state, action) => {
  return updateObject(state, {
    label: action.label,
  });
};
const setHoldingAccess = (state, action) => {
  return updateObject(state, {
    holdingAccess: action.holdingAccess,
  });
};
const setParentsCharts = (state, action) => {
  return updateObject(state, {
    parentsCharts: action.parentsCharts,
  });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
    authRedirectPath: "/",
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const setChecked = (state, action) => {
  return updateObject(state, { checked: action.checked });
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_USER_DATA:
      return setUserData(state, action);
    case actionTypes.SET_USER_LABEL:
      return setUserLabel(state, action);
    case actionTypes.SET_CHECKED:
      return setChecked(state, action);
    case actionTypes.SET_HOLDING_ACCESS:
      return setHoldingAccess(state, action);
    case actionTypes.SET_PARENTS_CHARTS:
      return setParentsCharts(state, action);
    case actionTypes.SET_SOCKET:
      return setSocket(state, action);
    default:
      return state;
  }
};

export default reducer;
