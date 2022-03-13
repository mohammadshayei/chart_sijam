import * as actionTypes from "./actionTypes";

export const setEmployees =
  ({ employees }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_EMPLOYEES,
      payload: { employees },
    });
  };

export const addEmployee = (employee) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_EMPLOYEE,
    payload: employee,
  });
};

export const removeEmployee =
  ({ userId }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_EMPLOYEE,
      payload: { userId },
    });
  };

export const setHoldingId =
  ({ id }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_HOLDING_ID,
      payload: { id },
    });
  };

export const setHoldingInfo = (info) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_HOLDING_INFO,
    info,
  });
};
export const setHoldings = (holdings) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_HOLDINGS,
    holdings,
  });
};
