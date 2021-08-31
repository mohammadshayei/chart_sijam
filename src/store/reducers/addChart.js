import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: "",
  data: {},
  chartData: {
    title: "عنوان نمودار",
    type: "Line",
    data: {
      isCategoryAdded: false,
      valueCount: 0,
      data: [],
      options: {
        fieldNames: {
          field1: "",
        },
        radius: 70,
        innerRadius: 40,
        startAngle: 0,
        endAngle: 360,
        insideLabel: true,
        legend: {
          display: true,
          position: "bottom",
          valueLabelsText: " : {value}",
        },
        xyCursor: false,
        xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
        series: {
          labels: {
            bent: false,
            radius: 10,
            padding: 0,
            disabled: false,
            text: "{category}",
            color: "#000",
            maxWidth: 130,
            wrap: true,
          },
          alignLabels: false,
          stacked: false,
          strokeWidth: 2,
          // smoothing: "monotoneX",
          tensionX: 0.77,
          bullet: {
            display: true,
            strokeColor: "#fff",
            strokeWidth: 0,
          },
        },
        slices: {
          draggable: false,
          tooltip: {
            display: true,
            text: "{category}: {value.value}",
          },
          cornerRadius: 10,
          innerCornerRadius: 7,
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

const setAddChartId = (state, action) => {
  const { id } = action;
  return {
    ...state,
    id,
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
    case actionTypes.SET_ADD_CHART_ID:
      return setAddChartId(state, action);
    default:
      return state;
  }
};

export default reducer;
