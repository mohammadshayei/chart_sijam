import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: "",
  isEdit: false,
  isFullscreen: false,
  emptyRequireds: [],
  data: {},
  filteredData: [],
  chartData: {
    title: "",
    type: "Line",
    config: {
      period: "",
      autoUpdate: false,
    },
    shareAll: false,
    editAll: false,
    viewAll: false,
    shareList: [],
    editList: [],
    viewList: [],
    data: {
      data: [],
      options: {
        fieldNames: {},
        theme: "noTheme",
        radius: 70,
        isDoughnut: false,
        innerRadius: 50,
        startAngle: 0,
        endAngle: 360,
        insideLabel: false,
        legend: {
          display: true,
          position: "top",
          colorize: false,
          valueLabelsText: "{name}",
        },
        xyCursor: false,
        axes: {
          xAxes: {
            rotation: false,
            repeatingCategories: true,
            minGridDistance: 30,
            gridTemplateLocation: 0,
          },
          yAxes: {
            break: { active: false, start: 0, end: 0, size: 0 },
          },
        },
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
          // tensionX: 0.77,
          smooth: true,
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
    filteredData: data.data
  };
};

const setChartData = (state, action) => {
  const chartData = action.payload;
  let requireds = chartData.data.data.length === 0 ? [] : state.emptyRequireds
  return {
    ...state,
    emptyRequireds: requireds,
    chartData: {
      ...state.chartData,
      title: chartData.title,
      type: chartData.type,
      config: chartData.config,
      shareAll: chartData.shareAll,
      editAll: chartData.editAll,
      viewAll: chartData.viewAll,
      shareList: chartData.shareList,
      editList: chartData.editList,
      viewList: chartData.viewList,
      data: chartData.data,
    },
  };
};
const updatedDataField = (state, action) => {
  const { selected, inputIndex, fieldValues } = action.payload;
  let updatedChartData = { ...state.chartData }
  let updatedData = [...updatedChartData.data.data], updatedOptions = { ...updatedChartData.data.options };
  for (let index = 0; index < fieldValues.length; index++) {
    const fieldName =
      inputIndex === 0 ? "category" : `field${inputIndex}`;
    let found = false;
    for (const key in updatedData[index]) {
      if (key === fieldName) {
        updatedData[index][key] = fieldValues[index];
        found = true;
      }
    }
    if (!found) {
      updatedData[index] = {
        ...updatedData[index],
        [fieldName]: fieldValues[index],
      };
    }
  }
  if (inputIndex !== 0) {
    let valueExst = false, count = 1;
    for (const key in updatedOptions.fieldNames) {
      count++;
      if (updatedOptions.fieldNames[key] === selected) {
        valueExst = true;
      }
    }
    if (!valueExst)
      updatedOptions.fieldNames = { ...updatedOptions.fieldNames, [`field${count}`]: selected }
  }
  return {
    ...state,
    chartData: {
      ...state.chartData,
      data: {
        ...state.chartData.data,
        data: updatedData,
        options: updatedOptions
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

const setIsEdit = (state, action) => {
  const { isEdit } = action;
  return {
    ...state,
    isEdit,
  };
};

const setChartOptions = (state, action) => {
  const { chartOptions } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      data: {
        ...state.chartData.data,
        options: chartOptions,
      },
    },
  };
};
const setChartOptionsAndType = (state, action) => {
  const { item } = action.payload;
  let updatedType, updatedOptions = { ...state.chartData.data.options };
  switch (item) {
    case "smooth":
      updatedType = "Line";
      updatedOptions.series.smooth = true;
      break;
    case "line":
      updatedType = "Line";
      updatedOptions.series.smooth = false;
      break;
    case "stackedBar":
      updatedType = "Column";
      updatedOptions.series.stacked = true;
      break;
    case "bar":
      updatedType = "Column";
      updatedOptions.series.stacked = false;
      break;
    case "pie":
      updatedType = "Pie";
      updatedOptions.isDoughnut = false;
      updatedOptions.innerRadius = 0.0001;
      break;
    case "donut":
      updatedType = "Pie";
      updatedOptions.isDoughnut = true;
      updatedOptions.innerRadius = 50;
      break;

    default:
      break;
  }
  return {
    ...state,
    chartData: {
      ...state.chartData,
      type: updatedType,
      data: {
        ...state.chartData.data,
        options: updatedOptions,
      },
    },
  };
};

const fullscreenChart = (state, action) => {
  const { isFullscreen } = action.payload;
  return {
    ...state,
    isFullscreen,
  };
};

const setChartDataFilter = (state, action) => {
  const { data } = action.payload;
  return {
    ...state,
    filteredData: data
  };
};

const setAccessToAll = (state, action) => {
  const { accessType, access } = action.payload;
  return {
    ...state,
    chartData: {
      ...state.chartData,
      [`${accessType}All`]: access,
      [`${accessType}List`]: [],
    },
  };
};

const updateAccessList = (state, action) => {
  const { accessType, employee, add } = action.payload;
  let updatedList = [...state.chartData[`${accessType}List`]]
  if (add) {
    if (employee.length > 1) {
      updatedList = []
      employee.forEach(emp => {
        updatedList = [...updatedList, emp.user._id]
      });
    }
    else
      updatedList = [...updatedList, ...employee]
  } else {
    if (employee.length > 1)
      updatedList = []
    else
      updatedList = updatedList.filter((emp) => emp !== employee[0])
  }
  return {
    ...state,
    chartData: {
      ...state.chartData,
      [`${accessType}List`]: updatedList,
    },
  };
};

const updateEmptyRequireds = (state, action) => {
  const { emptyRequireds } = action.payload;
  return {
    ...state,
    emptyRequireds
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
    case actionTypes.SET_IS_EDIT:
      return setIsEdit(state, action);
    case actionTypes.SET_CHART_OPTIONS:
      return setChartOptions(state, action);
    case actionTypes.SET_CHART_OPTIONS_AND_TYPE:
      return setChartOptionsAndType(state, action);
    case actionTypes.FULL_SCREEN_CHART:
      return fullscreenChart(state, action);
    case actionTypes.SET_CHART_DATA_FILTER:
      return setChartDataFilter(state, action);
    case actionTypes.SET_ACCESS_TO_ALL:
      return setAccessToAll(state, action);
    case actionTypes.UPDATE_ACCESS_LIST:
      return updateAccessList(state, action);
    case actionTypes.UPDATE_EMPTY_REQUIREDS:
      return updateEmptyRequireds(state, action);
    case actionTypes.UPDATE_DATA_FIELD:
      return updatedDataField(state, action);

    default:
      return state;
  }
};

export default reducer;
