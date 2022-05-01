import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: "",
  isEdit: false,
  isFullscreen: false,
  emptyRequireds: [],
  data: [],
  filterRules: {
    operator: "",
    selectedFilter: 0,
    fields: []
  },
  metaData: {
    fields: [],
    filters: []
  },
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
            rotation: true,
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
    data: data ? data : [],
  };
};
const changeFieldsMEtaData = (state, action) => {
  const { index, value, name } = action.payload;
  let updatedMetaData = { ...state.metaData }
  let updatedFields = [...updatedMetaData.fields]
  let check = updatedFields.findIndex(item => item.index === index)
  if (check > -1) {
    updatedFields[check].value = value;
    updatedFields[check].name = name;
  } else {
    updatedFields.push({ index, value, name })
  }
  updatedMetaData.fields = updatedFields;
  return {
    ...state,
    metaData: updatedMetaData,
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

const setFilterFields = (state, action) => {
  const { operator, selected, fields } = action.payload;
  return {
    ...state,
    filterRules: {
      operator,
      selectedFilter: selected,
      fields: fields
    },
  };
};

const changeFiltersMetaData = (state, action) => {
  const { id, name, add, value } = action.payload;
  let updatedMetaData = { ...state.metaData }
  let updatedFilters = [...updatedMetaData.filters]

  let check = updatedFilters.findIndex(item => item.id === id)
  if (check > -1) {
    if (add) {
      updatedFilters[check].name = name;
      updatedFilters[check].type = state.filterRules.operator;
      updatedFilters[check].rules = state.filterRules.filters;
    }
    else {
      updatedFilters = updatedFilters.filter(item => item.id !== id)
    }
  } else {
    updatedFilters = [
      ...updatedFilters,
      {
        id,
        name,
        type: state.filterRules.operator === "یا" ?
          "or" : state.filterRules.operator === "و" ?
            "and" : "",
        filters: value
      }
    ]
  }
  updatedMetaData.filters = updatedFilters;
  return {
    ...state,
    metaData: updatedMetaData,
  };
};

const clearMetaData = (state) => {
  return {
    ...state,
    metaData: {
      fields: [],
      filters: []
    },
  };
};

const setAccessToAll = (state, action) => {
  const { accessType, access } = action.payload;
  let viewAll = state.chartData.viewAll,
    shareAll = state.chartData.shareAll,
    editAll = state.chartData.editAll,
    viewList = [...state.chartData.viewList],
    shareList = [...state.chartData.shareList],
    editList = [...state.chartData.editList];

  if (access) {
    if (accessType === "view" || accessType === "share" || accessType === "edit") {
      viewAll = access
      viewList = []
    }
    if (accessType === "share" || accessType === "edit") {
      shareAll = access
      shareList = []
    }
    if (accessType === "edit") {
      editAll = access
      editList = []
    }
  } else {
    if (accessType === "edit" || accessType === "share" || accessType === "view") {
      editAll = access
      editList = []
    }
    if (accessType === "share" || accessType === "view") {
      shareAll = access
      shareList = []
    }
    if (accessType === "view") {
      viewAll = access
      viewList = []
    }
  }

  return {
    ...state,
    chartData: {
      ...state.chartData,
      viewAll,
      shareAll,
      editAll,
      viewList,
      editList,
      shareList
    },
  };
};

const updateAccessList = (state, action) => {
  const { accessType, employee, add } = action.payload;
  let viewAll = state.chartData.viewAll,
    shareAll = state.chartData.shareAll,
    editAll = state.chartData.editAll,
    viewList = [...state.chartData.viewList],
    shareList = [...state.chartData.shareList],
    editList = [...state.chartData.editList];

  if (add) {
    if (employee.length > 1) {
      if (accessType === "view" || accessType === "share" || accessType === "edit") {
        if (viewAll)
          viewAll = false
        viewList = [];
      }
      if (accessType === "share" || accessType === "edit") {
        if (shareAll)
          shareAll = false
        shareList = [];
      }
      if (accessType === "edit") {
        if (editAll)
          editAll = false
        editList = [];
      }
      employee.forEach((emp) => {
        if (accessType === "view" || accessType === "share" || accessType === "edit")
          viewList = [...viewList, emp.user._id];
        if (accessType === "share" || accessType === "edit")
          shareList = [...shareList, emp.user._id];
        if (accessType === "edit")
          editList = [...editList, emp.user._id];
      });
    }
    else {
      if (accessType === "view" || accessType === "share" || accessType === "edit") {
        if (viewAll)
          viewAll = false
      }
      if (accessType === "share" || accessType === "edit") {
        if (shareAll)
          shareAll = false
      }
      if (accessType === "edit") {
        if (editAll)
          editAll = false
      }
      if (accessType === "view" || accessType === "share" || accessType === "edit")
        viewList = viewList.includes(employee[0]) ? viewList : [...viewList, ...employee];
      if (accessType === "share" || accessType === "edit")
        shareList = shareList.includes(employee[0]) ? shareList : [...shareList, ...employee];
      if (accessType === "edit")
        editList = editList.includes(employee[0]) ? editList : [...editList, ...employee];
    }
  }
  else {
    if (employee.length > 1) {
      if (accessType === "edit" || accessType === "share" || accessType === "view")
        editList = [];
      if (accessType === "share" || accessType === "view")
        shareList = [];
      if (accessType === "view")
        viewList = [];
    }
    else {
      if (accessType === "edit" || accessType === "share" || accessType === "view")
        editList = editList.filter((emp) => emp !== employee[0]);
      if (accessType === "share" || accessType === "view")
        shareList = shareList.filter((emp) => emp !== employee[0]);
      if (accessType === "view")
        viewList = viewList.filter((emp) => emp !== employee[0]);
    }
  }
  return {
    ...state,
    chartData: {
      ...state.chartData,
      viewAll,
      shareAll,
      editAll,
      viewList,
      editList,
      shareList
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
    case actionTypes.SET_FILTER_FIELDS:
      return setFilterFields(state, action);
    case actionTypes.SET_ACCESS_TO_ALL:
      return setAccessToAll(state, action);
    case actionTypes.UPDATE_ACCESS_LIST:
      return updateAccessList(state, action);
    case actionTypes.UPDATE_EMPTY_REQUIREDS:
      return updateEmptyRequireds(state, action);
    case actionTypes.UPDATE_DATA_FIELD:
      return updatedDataField(state, action);
    case actionTypes.CHANGE_FIELDS_IN_META_DATA:
      return changeFieldsMEtaData(state, action);
    case actionTypes.CHANGE_FILTERS_IN_META_DATA:
      return changeFiltersMetaData(state, action);
    case actionTypes.CHANGE_CLEAR_META_DATA:
      return clearMetaData(state);

    default:
      return state;
  }
};

export default reducer;
