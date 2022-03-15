import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // holding: null,
  // company: null,
  // software: null,
  // activeBackup: null,
  // banks: null,
  // items: { holdings: [] },
  banks: [],
  selectedCompanies: [],
  selectedSoftwares: [],
  selectedActiveBackups: [],
  selectedBanks: [],
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
    default:
      return state;
  }
};

export default reducer;
