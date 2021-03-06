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

export const updateChartData = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_CHART_DATA,
    payload,
  });
};
export const setMergedData = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_MERGED_DATA,
    payload,
  });
};
export const setChartsLoading = (loading) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHARTS_LOADING,
    loading,
  });
};
export const updateFaveList = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_FAVE_LIST,
    payload,
  });
};
export const setchartLabel = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHART_LABEL,
    payload,
  });
};

export const changeCreatedChartList = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_CREATED_CHART_LIST,
    payload,
  });
};
export const changeLoading = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_LOADING_CHART,
    payload,
  });
};
export const changeLoadingCharts = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_LOADING_CHARTS,
    payload,
  });
};
export const changeSelectedFilter = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_SELECTED_FILTER,
    payload,
  });
};
export const deleteCharts = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_CHARTS,
    payload,
  });
};
export const deleteSepratedCharts = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_SEPRATED_CHARTS,
    payload,
  });
};

export const seprateChart = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.SEPRATE_CHART,
    payload,
  });
};
export const updateChartOptions = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_CHART_OPTIONS,
    payload,
  });
};