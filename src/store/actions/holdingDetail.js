import * as actionTypes from "./actionTypes";

export const setEmployees = ({ employees }) => (dispatch) => {
    dispatch({
        type: actionTypes.SET_EMPLOYEES,
        payload: { employees },
    });
};

export const addEmployee = ({ id, username, password, image, phone, label }) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_EMPLOYEE,
        payload: { id, username, password, image, phone, label },
    });
};

export const removeEmployee = ({ userId }) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_EMPLOYEE,
        payload: { userId },
    });
};
