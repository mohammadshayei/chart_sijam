import * as actionTypes from "./actionTypes";

export const setBankData = (data) => {
  return {
    type: actionTypes.SET_BANKS_DATA,
    data: data,
  };
};
