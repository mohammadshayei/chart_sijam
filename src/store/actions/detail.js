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
export const clearSelected = () => {
  return {
    type: actionTypes.CLEAR_SELECTED,
  };
};
export const setSourceCharts = (payload) => {
  return {
    type: actionTypes.SET_SOURCE_CHARTS,
    payload,
  };
};
export const changeInfoINSourceCharts = (payload) => {
  return {
    type: actionTypes.CHANGE_INFO_IN_SOURCE_CHARTS,
    payload,
  };
};
export const resetTimeSee = (payload) => {
  return {
    type: actionTypes.RESET_TIME_SEE,
    payload,
  };
};
export const setUnityFilter = (payload) => {
  return {
    type: actionTypes.SET_UNITY_FILTER,
    payload,
  };
};
