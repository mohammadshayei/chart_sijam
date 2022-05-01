import * as actionTypes from "./actionTypes";

export const selectChartData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_DATA_ADD_CHART,
    data,
  });
};

export const setChartData = (chartData) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_DATA_ADD_CHART,
    payload: chartData,
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
    isEdit,
  });
};
export const updatedDataField = (payload) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_DATA_FIELD,
    payload,
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

export const setChartOptionsAndType =
  (payload) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_CHART_OPTIONS_AND_TYPE,
        payload,
      });
    };
export const changeFieldsMEtaData =
  (payload) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.CHANGE_FIELDS_IN_META_DATA,
        payload,
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

export const setFilterFields =
  (payload) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_FILTER_FIELDS,
        payload,
      });
    };

export const setAccessToAll =
  ({ accessType, access }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.SET_ACCESS_TO_ALL,
        payload: { accessType, access },
      });
    };

export const updateAccessList =
  ({ accessType, employee, add }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPDATE_ACCESS_LIST,
        payload: { accessType, employee, add },
      });
    };

export const updateEmptyRequireds =
  ({ emptyRequireds }) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.UPDATE_EMPTY_REQUIREDS,
        payload: { emptyRequireds },
      });
    };

export const changeFiltersMetaData =
  (payload) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.CHANGE_FILTERS_IN_META_DATA,
        payload,
      });
    };

export const clearMetaData =
  (payload) =>
    (dispatch) => {
      dispatch({
        type: actionTypes.CHANGE_CLEAR_META_DATA,
        payload,
      });
    };