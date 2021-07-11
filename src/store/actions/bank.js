import * as actionTypes from "./actionTypes";

export const selectBank = (bank) => {
  return {
    type: actionTypes.SELECT_BANK,
    bank: bank,
  };
};
export const clearBanks = () => {
  return {
    type: actionTypes.CLEAR_MY_BANKS,
  };
};
