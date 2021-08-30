import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  chartData: {},
};

const setChartData = (state, action) => {
  const { data } = action;
  return {
    ...state,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_DATA_ADD_CHART:
      return setChartData(state, action);
    default:
      return state;
  }
};

export default reducer;
