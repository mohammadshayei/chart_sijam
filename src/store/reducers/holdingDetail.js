import * as actionTypes from "../actions/actionTypes";

const initialState = {
  employees: null,
  labels: null,
  selectedHolding: null,
  holdings: [],
};

const setEmployees = (state, action) => {
  const { employees } = action.payload;
  let newEmployees = [];
  employees.map((employee) => {
    newEmployees = [
      ...newEmployees,
      {
        user: employee.user,
        label: employee.label,
      },
    ];
  });
  return {
    ...state,
    employees: [...newEmployees],
  };
};

const addEmployee = (state, action) => {
  return {
    ...state,
    employees: [...state.employees, action.payload],
  };
};

const removeEmployee = (state, action) => {
  const { userId } = action.payload;
  let newData = state.employees.filter((item) => item.user._id !== userId);
  return {
    ...state,
    employees: newData,
  };
};


const setHoldingInfo = (state, action) => {
  return {
    ...state,
    selectedHolding: action.info,
  };
};
const setHoldings = (state, action) => {
  return {
    ...state,
    holdings: action.holdings,
  };
};

const editHodlingInfo = (state, action) => {
  const { value, mode } = action.payload;
  if (mode !== "name" && mode !== "image") return { ...state };
  let updatedSelectedHolding = { ...state.selectedHolding };
  let updatedHoldings = [...state.holdings];
  if (mode === "name") {
    updatedSelectedHolding.holdingName = value;
    let updatedHoldingIndex = updatedHoldings.findIndex(
      (item) => item.holdingId === updatedSelectedHolding.holdingId
    );
    if (updatedHoldingIndex < 0) return { ...state };
    updatedHoldings[updatedHoldingIndex].holdingName = value;
  } else {
    updatedSelectedHolding.holdingImage = value;
    let updatedHoldingIndex = updatedHoldings.findIndex(
      (item) => item.holdingId === updatedSelectedHolding.holdingId
    );
    if (updatedHoldingIndex < 0) return { ...state };
    updatedHoldings[updatedHoldingIndex].holdingImage = value;
  }
  return {
    ...state,
    selectedHolding: updatedSelectedHolding,
    holdings: updatedHoldings,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMPLOYEES:
      return setEmployees(state, action);
    case actionTypes.ADD_EMPLOYEE:
      return addEmployee(state, action);
    case actionTypes.REMOVE_EMPLOYEE:
      return removeEmployee(state, action);
    case actionTypes.SET_HOLDING_INFO:
      return setHoldingInfo(state, action);
    case actionTypes.SET_HOLDINGS:
      return setHoldings(state, action);
    case actionTypes.EDIT_HOLDING_INFO:
      return editHodlingInfo(state, action);

    default:
      return state;
  }
};

export default reducer;
