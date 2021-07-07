import * as actionTypes from "./actionTypes";

export const selectSoftware = (id, name, banks, type, parent) => {
  return {
    type: actionTypes.SELECT_MENU_ITEM,
    id: id,
    name: name,
    banks: banks,
    myType: type,
    parent: parent,
  };
};
