import * as actionTypes from "./actionTypes";

export const selectChartData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_DATA_ADD_CHART,
    data: data,
  });
};

export const setChartData =
  ({ title, type, data }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_DATA_ADD_CHART,
      payload: { title, type, data },
    });
  };

export const setCategoryAdded =
  ({ isAdded }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_CATEGORY_ADDED,
      payload: { isAdded },
    });
  };

export const setValueCount =
  ({ valueCount }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_VALUE_COUNT,
      payload: { valueCount },
    });
  };

export const setAddChartId = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_ADD_CHART_ID,
    id: id,
  });
};

export const setChartTitle =
  ({ title }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_TITLE_ADD_CHART,
      payload: { title },
    });
  };

export const setChartTimer =
  ({ period }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_TIMER_ADD_CHART,
      payload: { period },
    });
  };
