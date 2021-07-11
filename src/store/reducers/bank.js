import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  banks: [],
};

const addBank = (state, action) => {
  let count = state.banks.length;
  let newBanks = state.banks.filter((bk) => bk.id !== action.bank.id);
  if (count === newBanks.length) newBanks.push(action.bank);
  return {
    ...state,
    banks: newBanks,
  };
};
const clearMyBanks = (state) => {
  return {
    ...state,
    banks: [],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_BANK:
      return addBank(state, action);
    case actionTypes.CLEAR_MY_BANKS:
      return clearMyBanks(state);
    default:
      return state;
  }
};

export default reducer;
