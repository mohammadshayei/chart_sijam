import * as actionTypes from "./actionTypes";

export const addFieldPicker = (fieldPicker) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_FIELD_PICKER,
    fieldPicker: fieldPicker,
  });
};

export const removeFieldPicker =
  ({ index }) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.REMOVE_FIELD_PICKER,
      payload: { index },
    });
  };
