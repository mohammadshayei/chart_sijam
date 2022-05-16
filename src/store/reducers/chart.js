import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: {},
  sepratedChartInfo: [],
  layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
  loading: false,
  breakpoint: "lg",
  editMode: false,
  createdList: [],
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

const changeIdInCreatedList = (state, action) => {
  const { value, mode } = action.payload;
  if (!value) return { ...state };
  let updatedCreatedList = [...state.createdList];
  if (mode === "add_one") {
    let exist = updatedCreatedList.findIndex((item) => item === value) > -1;
    if (!exist) updatedCreatedList.push(value);
  } else if (mode === "add_list") {
    value.forEach((item) => {
      let exist = updatedCreatedList.findIndex((itm) => itm === item) > -1;
      if (!exist) updatedCreatedList.push(item);
    });
  }
  return {
    ...state,
    createdList: updatedCreatedList,
  };
};
const seprateChart = (state, action) => {
  const { chartId, data, filters } = action.payload;
  let newLayouts = { lg: [], md: [], sm: [], xs: [], xxs: [] };
  let updatedSepratedChartInfo = [...state.sepratedChartInfo];
  let updatedChartsData = {};

  Object.entries(state.data).forEach(([k, v]) => {
    if (k === chartId) {
      updatedChartsData = { ...updatedChartsData, [k]: { ...v, hide: true } };
      data.forEach((item, index) => {
        updatedChartsData = {
          ...updatedChartsData,
          [uuidv4().replace(/\-/g, "")]: {
            ...state.data[chartId],
            data: item,
            loading: false,
            seprated: chartId,
            filterName: filters[index].filter.name,
          },
        };
      });
    } else updatedChartsData = { ...updatedChartsData, [k]: v };
  });

  Object.entries(updatedChartsData)
    .filter(([_, v]) => !v.hide)
    .forEach(([k, v], index) => {
      newLayouts = {
        lg: [
          ...newLayouts.lg,
          {
            minW: 5,
            minH: 4,
            w: 6,
            h: 6,
            x: ((index + 2) * 6) % 12,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        md: [
          ...newLayouts.md,
          {
            minW: 5,
            minH: 4,
            w: 5,
            h: 4,
            x: (index * 5) % 10,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        sm: [
          ...newLayouts.sm,
          {
            minW: 4,
            minH: 4,
            w: 6,
            h: 4,
            x: ((index + 2) * 6) % 6,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xs: [
          ...newLayouts.xs,
          {
            minW: 3,
            minH: 3,
            w: 4,
            h: 4,
            x: ((index + 2) * 4) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xxs: [
          ...newLayouts.xxs,
          {
            minW: 2,
            minH: 3,
            w: 3,
            h: 3,
            x: ((index + 2) * 3) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
      };
    });

  updatedSepratedChartInfo.push({
    chartId: chartId,
    colorIndex: (state.sepratedChartInfo.length + 1) % 2,
  });
  return {
    ...state,
    data: updatedChartsData,
    layouts: newLayouts,
    sepratedChartInfo: updatedSepratedChartInfo,
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
const updateFaveList = (state, action) => {
  const { chartId, faveList } = action.payload;
  let updatedData = { ...state.data };
  if (!updatedData[chartId]) return { ...state };
  updatedData[chartId].faveList = faveList;
  return {
    ...state,
    data: updatedData,
  };
};

const setChartsData = (state, action) => {
  let newData = state.data;
  let newLayouts = { lg: [], md: [], sm: [], xs: [], xxs: [] };
  Object.entries(action.data)
    .filter((_, v) => !v.hide)
    .map(([k, v], index) => {
      newLayouts = {
        lg: [
          ...newLayouts.lg,
          {
            minW: 5,
            minH: 4,
            w: 6,
            h: 6,
            x: ((index + 2) * 6) % 12,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        md: [
          ...newLayouts.md,
          {
            minW: 5,
            minH: 4,
            w: 5,
            h: 4,
            x: ((index + 2) * 5) % 10,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        sm: [
          ...newLayouts.sm,
          {
            minW: 4,
            minH: 4,
            w: 6,
            h: 4,
            x: ((index + 2) * 6) % 6,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xs: [
          ...newLayouts.xs,
          {
            minW: 3,
            minH: 3,
            w: 4,
            h: 4,
            x: ((index + 2) * 4) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xxs: [
          ...newLayouts.xxs,
          {
            minW: 2,
            minH: 3,
            w: 3,
            h: 3,
            x: ((index + 2) * 3) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
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
const deleteCharts = (state, action) => {
  const { chartsId } = action.payload;
  let newData = {};

  Object.entries(state.data).forEach(([k, v]) => {
    if (chartsId.findIndex((item) => item === k) < 0)
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
const deleteSepratedCharts = (state, action) => {
  const { id } = action.payload;
  let updatedChartsData = {};
  let newLayouts = { lg: [], md: [], sm: [], xs: [], xxs: [] };
  let updatedSepratedChartInfo = [...state.sepratedChartInfo];

  Object.entries(state.data).forEach(([k, v]) => {
    if (k === id) {
      updatedChartsData = {
        ...updatedChartsData,
        [k]: { ...v, hide: false },
      };
    } else if (v.seprated !== id)
      updatedChartsData = { ...updatedChartsData, [k]: v };
  });
  Object.entries(updatedChartsData)
    .filter(([_, v]) => !v.hide)
    .forEach(([k, v], index) => {
      newLayouts = {
        lg: [
          ...newLayouts.lg,
          {
            minW: 5,
            minH: 4,
            w: 6,
            h: 6,
            x: ((index + 2) * 6) % 12,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        md: [
          ...newLayouts.md,
          {
            minW: 5,
            minH: 4,
            w: 5,
            h: 4,
            x: ((index + 2) * 5) % 10,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        sm: [
          ...newLayouts.sm,
          {
            minW: 4,
            minH: 4,
            w: 6,
            h: 4,
            x: ((index + 2) * 6) % 6,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xs: [
          ...newLayouts.xs,
          {
            minW: 3,
            minH: 3,
            w: 4,
            h: 4,
            x: ((index + 2) * 4) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
        xxs: [
          ...newLayouts.xxs,
          {
            minW: 2,
            minH: 3,
            w: 3,
            h: 3,
            x: ((index + 2) * 3) % 4,
            y: 0,
            i: k,
            // resizeHandles: ["se", "sw"]
          },
        ],
      };
    });

  updatedSepratedChartInfo = updatedSepratedChartInfo.filter(
    (item) => item.chartId !== id
  );
  return {
    ...state,
    data: updatedChartsData,
    layouts: newLayouts,
    sepratedChartInfo: updatedSepratedChartInfo,
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
        mergedData: {},
        config: {
          ...state.data[chartId].config,
          last_update: lastUpdate,
        },
        loading: false,
      },
    },
  };
};
const setMergedData = (state, action) => {
  const { chartId, mergedData } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: {
        ...state.data[chartId],
        mergedData: mergedData,
        loading: false,
      },
    },
  };
};
const changeLoading = (state, action) => {
  const { chartId, loading } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: {
        ...state.data[chartId],
        loading,
      },
    },
  };
};
const changeSelectedFilterId = (state, action) => {
  const { chartId, id } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: {
        ...state.data[chartId],
        selectedFilterId: id,
      },
    },
  };
};
const setchartLabel = (state, action) => {
  const { chartId, label } = action.payload;
  let updatedData = { ...state.data };
  if (!updatedData[chartId]) return { ...state };
  updatedData[chartId].label = label;
  return {
    ...state,
    data: updatedData,
  };
};
const updateChartOptions = (state, action) => {
  const { key, items } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [key]: {
        ...state.data[key],
        options: {
          ...state.data[key].options,
          ...items,
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
    case actionTypes.SET_CHARTS_DATA:
      return setChartsData(state, action);
    case actionTypes.SET_EDIT_MODE:
      return setEditMode(state, action);
    case actionTypes.DELETE_CHART:
      return deleteChart(state, action);
    case actionTypes.DELETE_SEPRATED_CHARTS:
      return deleteSepratedCharts(state, action);
    case actionTypes.DELETE_CHARTS:
      return deleteCharts(state, action);
    case actionTypes.CLEAR_CHARTS:
      return clearCharts(state, action);
    case actionTypes.UPDATE_CHART_DATA:
      return updateChartData(state, action);
    case actionTypes.SET_CHARTS_LOADING:
      return setChartsLoading(state, action);
    case actionTypes.UPDATE_FAVE_LIST:
      return updateFaveList(state, action);
    case actionTypes.SET_CHART_LABEL:
      return setchartLabel(state, action);
    case actionTypes.CHANGE_CREATED_CHART_LIST:
      return changeIdInCreatedList(state, action);
    case actionTypes.CHANGE_LOADING_CHART:
      return changeLoading(state, action);
    case actionTypes.CHANGE_SELECTED_FILTER:
      return changeSelectedFilterId(state, action);
    case actionTypes.SET_MERGED_DATA:
      return setMergedData(state, action);
    case actionTypes.SEPRATE_CHART:
      return seprateChart(state, action);
    case actionTypes.UPDATE_CHART_OPTIONS:
      return updateChartOptions(state, action);
    default:
      return state;
  }
};

export default reducer;
