import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  layouts: {lg:[],md:[],sm:[],xs:[]},
  breakpoint: "lg",
};

// chartData: {
//   type: "",
//   title: "",
//   data: [],
// },

const setChartType = (state, action) => {
  const { key, value, item } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [key]: {
        ...state.data[key],
        [item]: value,
      },
    },
  };
};

const setChartData = (state, action) => {
  const { chartId, chartData } = action.payload;
  return {
    ...state,
    data: {
      ...state.data,
      [chartId]: chartData,
    },
  };
};

const setChartsData = (state, action) => {
  let newData = state.data;
  let newLayouts=state.layouts
  Object.entries(action.data).map(([k, v]) => {
    newLayouts={
      "lg":[
        ...newLayouts.lg,
        {
          w:5,
          h:5,
          x:0,
          y:0,
          i:k
        }
      ],
      "md":[
        ...newLayouts.md,
        {
          w:3,
          h:2,
          x:0,
          y:0,
          i:k
        }
      ],
      "sm":[
        ...newLayouts.sm,
        {
          w:2,
          h:1,
          x:0,
          y:0,
          i:k
        }
      ],
      "xs":[
        ...newLayouts.xs,
        {
          w:1,
          h:1,
          x:0,
          y:0,
          i:k
        }
      ],
    }
    newData = {
      ...newData,
      [k]: v,
    };
  });
  return {
    ...state,
    data: newData,
    layouts:newLayouts,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHART_TYPE:
      return setChartType(state, action);
    case actionTypes.SET_CHART_DATA:
      return setChartData(state, action);
    case actionTypes.SET_CHARTS_DATA:
      return setChartsData(state, action);
    default:
      return state;
  }
};

export default reducer;
