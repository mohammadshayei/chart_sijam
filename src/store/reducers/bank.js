import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  bank: null,
};

const selectBank = (state, action) => {
  return updateObject(state, {
    bank: action.bank,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_BANK:
      return selectBank(state, action);
    default:
      return state;
  }
};

export default reducer;
