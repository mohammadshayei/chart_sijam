import * as actionTypes from "./actionTypes";

export const setBanks = (banks, mode) => {
  return {
    type: actionTypes.SET_BANKS,
    banks,
    mode,
  };
};
export const changeSelectedMenuItems = (payload) => {
  return {
    type: actionTypes.CHANGE_SELECTED_MENU_ITEMS,
    payload,
  };
};
export const removedChildSelectedMenuItems = (payload) => {
  return {
    type: actionTypes.REMOVED_CHILD_SELECTED_MENU_ITEMS,
    payload,
  };
};
export const changeBankItemStatus = (payload) => {
  return {
    type: actionTypes.CHANGE_BANK_ITEM_STATUS,
    payload,
  };
};
