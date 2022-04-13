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
export const editHodlingInfo = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_HOLDING_INFO,
    payload,
  });
};
export const deleteCreateCategory = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_CREATE_CATEGORY,
    payload,
  });
};
export const addChartToCategories = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_CHART_TO_CATEGORIES,
    payload,
  });
};
export const updateFaveCategory = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_FAVE_CATEGORY,
    payload,
  });
};
export const setCategory = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CATEGORY,
    payload,
  });
};
