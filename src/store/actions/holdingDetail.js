import * as actionTypes from "./actionTypes";

export const setEmployees = ({ employees }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_EMPLOYEES,
        payload: { employees },
    });
};

export const addEmployee = (employee) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_EMPLOYEE,
        payload: employee,
    });
};

export const removeEmployee = ({ userId }) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_EMPLOYEE,
        payload: { userId },
    });
};

export const setHoldingId = ({ id, name }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_HOLDING_ID,
        payload: { id, name },
    });
};
