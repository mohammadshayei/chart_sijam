import * as actionTypes from "./actionTypes";

export const selectChartData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_DATA_ADD_CHART,
    data: data,
  });
};

export const setChartData =
  ({ title, type, config, data }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_DATA_ADD_CHART,
        payload: { title, type, config, data },
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

export const setIsEdit = (isEdit) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_IS_EDIT,
    isEdit: isEdit,
  });
};

export const setChartOptions =
  ({ chartOptions }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_CHART_OPTIONS,
        payload: { chartOptions },
      });
    };

export const fullscreenChart =
  ({ isFullscreen }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.FULL_SCREEN_CHART,
        payload: { isFullscreen },
      });
    };

export const setChartDataFilter =
  ({ data }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_CHART_DATA_FILTER,
        payload: { data },
      });
    };