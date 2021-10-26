import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: "",
  data: {},
  chartData: {
    title: "",
    type: "Line",
    config: {
      period: "",
      autoUpdate: false,
    },
    data: {
      data: [],
      options: {
        fieldNames: {},
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

const setAddChartId = (state, action) => {
  const { id } = action;
  return {
    ...state,
    id,
  };
};

const setChartTitle = (state, action) => {
  const { title } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      title,
    },
  };
};

const setChartTimer = (state, action) => {
  const { period, autoUpdate } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      config: {
        ...state.chartData.config,
        period,
        autoUpdate,
      },
    },
  };
};

const removeDataField = (state, action) => {
  const { index } = action.payload;
  const data = state.chartData.data.data;
  const fieldNames = state.chartData.data.options.fieldNames;
  let updatedChartData = [];
  let updatedFieldNames = {};
  for (let i = 0; i < data.length; i++) {
    for (const field in data[i]) {
      if (`${field}` !== `field${index}`) {
        if (!updatedChartData[i])
          updatedChartData = [...updatedChartData, { [field]: data[i][field] }];
        else
          updatedChartData[i] = {
            ...updatedChartData[i],
            [field]: data[i][field],
          };
      }
    }
  }
  for (const field in fieldNames) {
    if (`${field}` !== `field${index}`) {
      updatedFieldNames = { ...updatedFieldNames, [field]: fieldNames[field] };
    }
  }
  return {
    ...state,
    chartData: {
      ...state.chartData,
      data: {
        ...state.chartData.data,
        data: updatedChartData,
        options: {
          ...state.chartData.data.options,
          fieldNames: updatedFieldNames,
        },
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
    case actionTypes.SET_ADD_CHART_ID:
      return setAddChartId(state, action);
    case actionTypes.SET_TITLE_ADD_CHART:
      return setChartTitle(state, action);
    case actionTypes.SET_TIMER_ADD_CHART:
      return setChartTimer(state, action);
    case actionTypes.REMOVE_DATA_FIELD:
      return removeDataField(state, action);
    default:
      return state;
  }
};

export default reducer;
