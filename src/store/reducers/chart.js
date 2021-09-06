import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
  loading: false,
  breakpoint: "lg",
  editMode: false,
};

// chartId: {
//   title: "",
//   type: "",
//   data: [],
// },

const setChartType = (state, action) => {
  const { key, value, item } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [key]: {
        ...state.data[key],
        [item]: value,
      },
    },
  };
};

const setChartData = (state, action) => {
  const { chartId, chartData } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: chartData,
    },
  };
};

const setChartOptions = (state, action) => {
  const { chartId, chartOptions } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: {
        ...state.data[chartId],
        data: { ...state.data[chartId].data, options: chartOptions },
      },
    },
  };
};
const clearCharts = (state, action) => {
  return {
    ...state,
    data: {},
  };
};
const setChartsLoading = (state, action) => {
  return {
    ...state,
    loading: action.loading,
  };
};

const setChartsData = (state, action) => {
  let newData = state.data;
  let newLayouts = state.layouts;
  Object.entries(action.data).map(([k, v], index) => {
    newLayouts = {
      lg: [
        ...newLayouts.lg,
        {
          minW: 5,
          minH: 4,
          w: 6,
          h: 6,
          x: ((index + 1) * 6) % 12,
          y: 0,
          i: k,
        },
      ],
      md: [
        ...newLayouts.md,
        {
          minW: 5,
          minH: 4,
          w: 5,
          h: 4,
          x: ((index + 1) * 5) % 10,
          y: 0,
          i: k,
        },
      ],
      sm: [
        ...newLayouts.sm,
        {
          minW: 4,
          minH: 4,
          w: 6,
          h: 4,
          x: ((index + 1) * 6) % 6,
          y: 0,
          i: k,
        },
      ],
      xs: [
        ...newLayouts.xs,
        {
          minW: 3,
          minH: 3,
          w: 4,
          h: 4,
          x: ((index + 1) * 4) % 4,
          y: 0,
          i: k,
        },
      ],
      xxs: [
        ...newLayouts.xxs,
        {
          minW: 2,
          minH: 3,
          w: 3,
          h: 3,
          x: ((index + 1) * 3) % 4,
          y: 0,
          i: k,
        },
      ],
    };
    newData = {
      ...newData,
      [k]: v,
    };
  });
  return {
    ...state,
    data: newData,
    layouts: newLayouts,
  };
};

const setEditMode = (state, action) => {
  const { isEdit } = action.payload;
  return {
    ...state,
    editMode: isEdit,
  };
};

const deleteChart = (state, action) => {
  const { chartId } = action.payload;
  let newData = {};
  Object.entries(state.data).map(([k, v]) => {
    if (k !== chartId)
      newData = {
        ...newData,
        [k]: v,
      };
  });
  return {
    ...state,
    data: newData,
  };
};

const updateChartData = (state, action) => {
  const { chartId, chartData, lastUpdate } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: {
        ...state.data[chartId],
        data: chartData,
        config: {
          ...state.data[chartId].config,
          lastUpdate,
        },
      },
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHART_TYPE:
      return setChartType(state, action);
    case actionTypes.SET_CHART_DATA:
      return setChartData(state, action);
    case actionTypes.SET_CHART_OPTIONS:
      return setChartOptions(state, action);
    case actionTypes.SET_CHARTS_DATA:
      return setChartsData(state, action);
    case actionTypes.SET_EDIT_MODE:
      return setEditMode(state, action);
    case actionTypes.DELETE_CHART:
      return deleteChart(state, action);
    case actionTypes.CLEAR_CHARTS:
      return clearCharts(state, action);
    case actionTypes.UPDATE_CHART_DATA:
      return updateChartData(state, action);
    case actionTypes.SET_CHARTS_LOADING:
      return setChartsLoading(state, action);
    default:
      return state;
  }
};

export default reducer;
