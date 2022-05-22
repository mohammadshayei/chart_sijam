import * as actionTypes from "../actions/actionTypes";

const initialState = {
  banks: [],
  selectedCompanies: [],
  selectedSoftwares: [],
  selectedActiveBackups: [],
  selectedBanks: [],
  sourceCharts: [],
  unityFilter: false,
};

const setBanks = (state, action) => {
  let updatedBanks = [...state.banks];
  if (action.mode !== "add" && action.mode !== "sub") return { ...state };
  if (action.mode === "add") {
    action.banks.forEach((item) => {
      if (state.banks.findIndex((bnk) => bnk._id === item._id) < 0)
        updatedBanks.push({ ...item, selected: false });
    });
    // updatedBanks = [...updatedBanks, ...action.banks];
  } else {
    updatedBanks = updatedBanks.filter(
      (item) => action.banks.findIndex((bnk) => bnk._id === item._id) < 0
    );
  }
  return {
    ...state,
    banks: updatedBanks,
  };
};
const changeSelectedMenuItems = (state, action) => {
  const { key, value, parents, mode } = action.payload;
  let updatedValues = state[key];
  if (mode !== "add" && mode !== "sub") return { ...state };
  if (mode === "add") {
    updatedValues.push({ parents, value });
  } else {
    updatedValues = state[key].filter((item) => item.value !== value);
  }
  return {
    ...state,
    [key]: updatedValues,
  };
};
const setUnityFilter = (state, action) => {
  const { value } = action.payload;
  return {
    ...state,
    unityFilter: value,
  };
};
const removedChildSelectedMenuItems = (state, action) => {
  const { _id, level } = action.payload;
  if (level > 3 && level < 0) return { ...state };
  let selectedSoftwares = [...state.selectedSoftwares],
    selectedActiveBackups = [...state.selectedActiveBackups],
    selectedBanks = [...state.selectedBanks],
    banks = [...state.banks];
  if (level === 1) {
    selectedSoftwares = selectedSoftwares.filter(
      (item) => item.parents[0] !== _id
    );
    selectedActiveBackups = selectedActiveBackups.filter(
      (item) => item.parents[0] !== _id
    );
    selectedBanks = selectedBanks.filter((item) => item.parents[0] !== _id);
    banks = banks.filter((item) => item.parents[0] !== _id);
  } else if (level === 2) {
    selectedActiveBackups = selectedActiveBackups.filter(
      (item) => item.parents[1] !== _id
    );
    selectedBanks = selectedBanks.filter((item) => item.parents[1] !== _id);
    banks = banks.filter((item) => item.parents[1] !== _id);
  } else {
    selectedBanks = selectedBanks.filter((item) => item.parents[2] !== _id);
    banks = banks.filter((item) => item.parents[2] !== _id);
  }
  return {
    ...state,
    selectedSoftwares,
    selectedActiveBackups,
    selectedBanks,
    banks,
  };
};
const chnageStatusBankItem = (state, action) => {
  const { _id, status } = action.payload;
  let updatedBanks = [...state.banks];
  let findIndex = updatedBanks.findIndex((item) => item._id === _id);
  if (findIndex < 0) return { ...state };
  updatedBanks[findIndex].selected = status;
  return {
    ...state,
    banks: updatedBanks,
  };
};
const clearSelected = (state) => {
  return {
    ...state,
    banks: [],
    selectedCompanies: [],
    selectedSoftwares: [],
    selectedActiveBackups: [],
    selectedBanks: [],
  };
};
const setSourceCharts = (state, action) => {
  const { charts } = action.payload;
  return {
    ...state,
    sourceCharts: charts,
  };
};
const changeInfoINSourceCharts = (state, action) => {
  const { chartId, value, mode } = action.payload;
  if (mode !== "label" || mode !== "fave") return { ...state };
  let updatedCharts = [...state.sourceCharts];
  let updatedChartIndex = updatedCharts.findIndex(
    (item) => item.chart._id === chartId
  );
  if (updatedChartIndex < 0) return { ...state };
  if (mode === "label") updatedCharts[updatedChartIndex].label = value;
  else updatedCharts[updatedChartIndex].chart.fave_list = value;
  return {
    ...state,
    sourceCharts: updatedCharts,
  };
};

const resetTimeSee = (state, action) => {
  const { chartId } = action.payload;
  let updatedSourceCharts = [...state.sourceCharts];
  let updatedChartIndex = updatedSourceCharts.findIndex(
    (item) => item.chart._id === chartId
  );
  if (updatedChartIndex < 0) return { ...state };
  updatedSourceCharts[updatedChartIndex].time.isSee = false;
  updatedSourceCharts[updatedChartIndex].time.duration = 0;
  updatedSourceCharts[updatedChartIndex].time.start = "";
  return {
    ...state,
    sourceCharts: updatedSourceCharts,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BANKS:
      return setBanks(state, action);
    case actionTypes.CHANGE_SELECTED_MENU_ITEMS:
      return changeSelectedMenuItems(state, action);
    case actionTypes.REMOVED_CHILD_SELECTED_MENU_ITEMS:
      return removedChildSelectedMenuItems(state, action);
    case actionTypes.CHANGE_BANK_ITEM_STATUS:
      return chnageStatusBankItem(state, action);
    case actionTypes.CLEAR_SELECTED:
      return clearSelected(state);
    case actionTypes.SET_SOURCE_CHARTS:
      return setSourceCharts(state, action);
    case actionTypes.CHANGE_INFO_IN_SOURCE_CHARTS:
      return changeInfoINSourceCharts(state, action);
    case actionTypes.RESET_TIME_SEE:
      return resetTimeSee(state, action);
    case actionTypes.SET_UNITY_FILTER:
      return setUnityFilter(state, action);
    default:
      return state;
  }
};

export default reducer;
