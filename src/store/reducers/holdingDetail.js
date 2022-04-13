import * as actionTypes from "../actions/actionTypes";

const initialState = {
  employees: null,
  labels: null,
  selectedHolding: null,
  selectedCategory: null,
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
const createDeleteCategory = (state, action) => {
  const { data, mode } = action.payload;
  if (mode !== "delete" && mode !== "create") return { ...state };
  let updatedSelectedHolding = { ...state.selectedHolding };
  let updatedHoldings = [...state.holdings];
  let updatedCategories = [...updatedSelectedHolding.categories];
  if (mode === "create") {
    updatedCategories.push({
      category: {
        _id: data._id,
        name: data.name,
        charts: [],
      },
    });
  } else {
    let findedCategroyIndex = updatedCategories.findIndex(
      (item) => item.category._id === data._id
    );
    if (findedCategroyIndex < 0) return { ...state };
    updatedCategories.splice(findedCategroyIndex, 1);
  }
  updatedSelectedHolding.categories = updatedCategories;
  let updatedHoldingIndex = updatedHoldings.findIndex(
    (item) => item.holdingId === updatedSelectedHolding.holdingId
  );
  if (updatedHoldingIndex < 0) return { ...state };
  updatedHoldings[updatedHoldingIndex].categories = updatedCategories;
  return {
    ...state,
    selectedHolding: updatedSelectedHolding,
    holdings: updatedHoldings,
  };
};

const addChartToCategories = (state, action) => {
  const { categoriesList, chartId } = action.payload;
  let updatedSelectedCategory = state.selectedCategory;
  let updatedSelectedHolding = { ...state.selectedHolding };
  let updatedHoldings = [...state.holdings];
  let updatedCategories = [...updatedSelectedHolding.categories];
  categoriesList.forEach((item) => {
    let categoryIndex = updatedCategories.findIndex(
      (c) => c.category._id === item._id
    );
    let updatedCharts = [...updatedCategories[categoryIndex].category.charts];
    let chartExist = updatedCharts.findIndex((chrt) => chrt.chart === chartId);
    if (item.checked) {
      if (chartExist < 0) updatedCharts.push({ chart: chartId });
    } else {
      updatedCharts.splice(chartExist, 1);
    }
    updatedCategories[categoryIndex].category.charts = updatedCharts;

    if (
      state.selectedCategory &&
      state.selectedCategory._id ===
        updatedCategories[categoryIndex].category._id
    )
      updatedSelectedCategory.charts = updatedCharts;
  });
  updatedSelectedHolding.categories = updatedCategories;

  let updatedHoldingIndex = updatedHoldings.findIndex(
    (item) => item.holdingId === updatedSelectedHolding.holdingId
  );
  if (updatedHoldingIndex < 0) return { ...state };
  updatedHoldings[updatedHoldingIndex].categories = updatedCategories;

  return {
    ...state,
    selectedHolding: updatedSelectedHolding,
    holdings: updatedHoldings,
  };
};
const updateFaveCategory = (state, action) => {
  const { chartId, checked } = action.payload;
  let updatedSelectedHolding = { ...state.selectedHolding };
  let updatedHoldings = [...state.holdings];
  let updatedCategories = [...updatedSelectedHolding.categories];
  let categoryIndex = updatedCategories.findIndex(
    (c) => c.category.name === "fave"
  );
  let updatedCharts = [...updatedCategories[categoryIndex].category.charts];
  let chartExist = updatedCharts.findIndex((chrt) => chrt.chart === chartId);
  if (checked) {
    if (chartExist < 0) updatedCharts.push({ chart: chartId });
  } else {
    updatedCharts.splice(chartExist, 1);
  }
  updatedCategories[categoryIndex].category.charts = updatedCharts;
  updatedSelectedHolding.categories = updatedCategories;
  let updatedHoldingIndex = updatedHoldings.findIndex(
    (item) => item.holdingId === updatedSelectedHolding.holdingId
  );
  if (updatedHoldingIndex < 0) return { ...state };
  updatedHoldings[updatedHoldingIndex].categories = updatedCategories;

  let updatedSelectedCategory = state.selectedCategory;
  if (
    state.selectedCategory &&
    state.selectedCategory._id === updatedCategories[categoryIndex].category._id
  )
    updatedSelectedCategory.charts = updatedCharts;

  return {
    ...state,
    selectedHolding: updatedSelectedHolding,
    holdings: updatedHoldings,
    selectedCategory: updatedSelectedCategory,
  };
};

const setCategory = (state, action) => {
  const { category } = action.payload;
  if (category) {
    let catExist =
      state.selectedHolding.categories.findIndex(
        (item) => item.category._id === category._id
      ) > -1;
    if (!catExist)
      return {
        ...state,
      };
  }
  return {
    ...state,
    selectedCategory: category,
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
    case actionTypes.DELETE_CREATE_CATEGORY:
      return createDeleteCategory(state, action);
    case actionTypes.ADD_CHART_TO_CATEGORIES:
      return addChartToCategories(state, action);
    case actionTypes.UPDATE_FAVE_CATEGORY:
      return updateFaveCategory(state, action);
    case actionTypes.SET_CATEGORY:
      return setCategory(state, action);

    default:
      return state;
  }
};

export default reducer;
