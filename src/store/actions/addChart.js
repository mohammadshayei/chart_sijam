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
