import * as actionTypes from "../actions/actionTypes";

const initialState = {
    id: null,
    employees: null,
    labels: null,
};

const setEmployees = (state, action) => {
    const { employees } = action.payload;
    let newEmployees = [];
    employees.map((employee) => {
        newEmployees = [...newEmployees,
        {
            user: employee.user,
            label: employee.label,
        }]
    })
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
    let newData = state.employees.filter(item => item.user._id !== userId);
    return {
        ...state,
        employees: newData
    };
};

const setHoldingId = (state, action) => {
    const { id } = action.payload;
    return {
        ...state,
        id
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
        case actionTypes.SET_HOLDING_ID:
            return setHoldingId(state, action);

        default:
            return state;
    }
};

export default reducer;
