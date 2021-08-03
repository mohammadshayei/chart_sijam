import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
  breakpoint: "lg",
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
    default:
      return state;
  }
};

export default reducer;
