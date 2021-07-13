import * as actionTypes from "../actions/actionTypes";

const initialState = {
  banks: null,
};

const setBanksData = (state, action) => {
  return {
    ...state,
    banks: action.data,
  };
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BANKS_DATA:
      return setBanksData(state, action);
    default:
      return state;
  }
};

export default reducer;
