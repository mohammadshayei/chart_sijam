import * as actionTypes from "../actions/actionTypes";

const initialState = {
  holding: null,
  company: null,
  software: null,
  activeBackup: null,
  banks: null,
  items: { holdings: [] },
};

const selectHodling = (state, action) => {
  return {
    ...state,
    holding: action.holding,
  };
};
const selectCompany = (state, action) => {
  return {
    ...state,
    company: action.company,
  };
};
const selectSoftware = (state, action) => {
  return {
    ...state,
    software: action.software,
  };
};
const selectActiveBackup = (state, action) => {
  return {
    ...state,
    activeBackup: action.activeBackup,
  };
};
const addBank = (state, action) => {
  let count = state.banks ? state.banks.length : 0;
  let newBanks = state.banks
    ? state.banks.filter((bk) => bk._id !== action.bank._id)
    : [];
  if (count === newBanks.length) newBanks.push(action.bank);
  return {
    ...state,
    banks: newBanks,
  };
};
const clearHolding = (state) => {
  return {
    ...state,
    holding: null,
  };
};
const clearCompany = (state) => {
  return {
    ...state,
    company: null,
  };
};
const clearSoftware = (state) => {
  return {
    ...state,
    software: null,
  };
};
const clearActiveBackup = (state) => {
  return {
    ...state,
    activeBackup: null,
  };
};

const clearBanks = (state) => {
  return {
    ...state,
    banks: [],
  };
};
const setItems = (state, action) => {
  return {
    ...state,
    items: action.items,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_HOLDING:
      return selectHodling(state, action);
    case actionTypes.SELECT_COMPANY:
      return selectCompany(state, action);
    case actionTypes.SELECT_SOFTWARE:
      return selectSoftware(state, action);
    case actionTypes.SELECT_ACTIVE_BACKUP:
      return selectActiveBackup(state, action);
    case actionTypes.SELECT_BANK:
      return addBank(state, action);
    case actionTypes.CLEAR_HOLDING:
      return clearHolding(state);
    case actionTypes.CLEAR_COMPANY:
      return clearCompany(state);
    case actionTypes.CLEAR_SOFTWARE:
      return clearSoftware(state);
    case actionTypes.CLEAR_ACTIVE_BACKUP:
      return clearActiveBackup(state);
    case actionTypes.CLEAR_MY_BANKS:
      return clearBanks(state);
    case actionTypes.SET_ITEMS:
      return setItems(state, action);
    default:
      return state;
  }
};

export default reducer;
