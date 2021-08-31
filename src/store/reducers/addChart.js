import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  chartData: {
    title: "",
    type: "",
    data: {
      isCategoryAdded: false,
      valueCount: 0,
      data: [],
      options: {
        fieldNames: {
          field1: "شرح سند",
        },
        legend: { display: true },
        xyCursor: false,
        xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
        series: {
          strokeWidth: 2,
          smoothing: "monotoneX",
          bullet: {
            display: true,
            strokeColor: "#fff",
            strokeWidth: 0,
          },
        },
      },
    },
  },
};

const selectChartData = (state, action) => {
  const { data } = action;
  return {
    ...state,
    data,
  };
};

const setChartData = (state, action) => {
  const { title, type, data } = action.payload;
  return {
    ...state,
    chartData: {
      title,
      type,
      data,
    },
  };
};

const setCategoryAdded = (state, action) => {
  const { isAdded } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      data: {
        ...state.chartData.data,
        isCategoryAdded: isAdded,
      },
    },
  };
};

const setValueCount = (state, action) => {
  const { valueCount } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      data: {
        ...state.chartData.data,
        valueCount: valueCount,
      },
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_DATA_ADD_CHART:
      return selectChartData(state, action);
    case actionTypes.SET_DATA_ADD_CHART:
      return setChartData(state, action);
    case actionTypes.SET_CATEGORY_ADDED:
      return setCategoryAdded(state, action);
    case actionTypes.SET_VALUE_COUNT:
      return setValueCount(state, action);
    default:
      return state;
  }
};

export default reducer;
