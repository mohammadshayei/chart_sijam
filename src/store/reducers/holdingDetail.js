import * as actionTypes from "../actions/actionTypes";

const initialState = {
    employees: null,
    labels: null,
};

const setEmployees = (state, action) => {
    const { employees } = action.payload;
    let newEmployees = [];
    employees.map((employee) => {
        newEmployees = [...newEmployees,
        {
            _id: employee._id,
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
    const { id, username, password, image, phone, label } = action.payload;
    return {
        ...state,
        employees: [...state.employees, { id, username, password, image, phone, label }],
    };
};

const removeEmployee = (state, action) => {
    const { userId } = action.payload;
    let newData = {};
    state.employees.map((employee) => {
        if (employee.userId !== userId)
            newData = {
                ...newData,
                employee,
            };
    });
    return {
        ...state,
        employee: newData
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

        default:
            return state;
    }
};

export default reducer;
