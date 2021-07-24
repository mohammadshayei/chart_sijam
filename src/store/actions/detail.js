import * as actionTypes from "./actionTypes";

export const selectHolding = (holding) => {
  return {
    type: actionTypes.SELECT_HOLDING,
    holding: holding,
  };
};
export const selectCompany = (company) => {
  return {
    type: actionTypes.SELECT_COMPANY,
    company: company,
  };
};
export const selectSoftware = (software) => {
  return {
    type: actionTypes.SELECT_SOFTWARE,
    software: software,
  };
};

export const selectBank = (bank) => {
  return {
    type: actionTypes.SELECT_BANK,
    bank: bank,
  };
};
export const clearHolding = () => {
  return {
    type: actionTypes.CLEAR_HOLDING,
  };
};
export const clearCompany = () => {
  return {
    type: actionTypes.CLEAR_COMPANY,
  };
};
export const clearSoftware = () => {
  return {
    type: actionTypes.CLEAR_SOFTWARE,
  };
};
export const clearBanks = () => {
  return {
    type: actionTypes.CLEAR_MY_BANKS,
  };
};

