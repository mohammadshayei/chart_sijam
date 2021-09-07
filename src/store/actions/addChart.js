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
  ({ period, autoUpdate }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_TIMER_ADD_CHART,
      payload: { period, autoUpdate },
    });
  };

export const removeDataField =
  ({ index }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_DATA_FIELD,
      payload: { index },
    });
  };
