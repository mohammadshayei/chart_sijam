import * as actionTypes from "./actionTypes";

export const setType =
  ({ key, value, item }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_CHART_TYPE,
      payload: { key, value, item },
    });
  };

export const setChartData =
  ({ chartId, chartData }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_CHART_DATA,
      payload: { chartId, chartData },
    });
  };

export const setChartsData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHARTS_DATA,
    data: data,
  });
};
