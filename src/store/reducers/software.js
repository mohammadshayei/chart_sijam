import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  id: "",
  name: "",
  banks: [],
  type: "",
  parent: "",
};

const selectMenu = (state, action) => {
  return updateObject(state, {
    id: action.id,
    name: action.name,
    banks: action.banks,
    type: action.myType,
    parent: action.parent,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_MENU_ITEM:
      return selectMenu(state, action);
    default:
      return state;
  }
};

export default reducer;
