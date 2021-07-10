import * as actionTypes from "./actionTypes";

export const selectBank = (bank) => {
  return {
    type: actionTypes.SELECT_BANK,
    bank: bank,
  };
};
