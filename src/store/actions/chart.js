import * as actionTypes from "./actionTypes";

export const setChartType =
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

export const setChartOptions =
  ({ chartId, chartOptions }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_CHART_OPTIONS,
      payload: { chartId, chartOptions },
    });
  };

export const setChartsData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHARTS_DATA,
    data: data,
  });
};

export const setEditMode =
  ({ isEdit }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_EDIT_MODE,
      payload: { isEdit },
    });
  };

export const deleteChart =
  ({ chartId }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_CHART,
      payload: { chartId },
    });
  };

export const clearCharts = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_CHARTS,
  });
};

export const updateChartData =
  ({ chartId, chartData }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CHART_DATA,
      payload: { chartId, chartData },
    });
  };
export const setChartsLoading = (loading) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHARTS_LOADING,
    loading,
  });
};
