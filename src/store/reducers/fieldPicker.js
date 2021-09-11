import * as actionTypes from "../actions/actionTypes";
import { stringFa } from "./../../assets/strings/stringFaCollection";
import FieldPicker from "./../../container/CreateCharts/Steps/XAxisStep/FieldPicker";

const initialState = [
  <FieldPicker key="0" title={stringFa.column_type} index={0} />,
  <FieldPicker key="1" title={stringFa.values} index={1} />,
];

const addFieldPicker = (state, action) => {
  return [...state, action.fieldPicker];
};

const removeFieldPicker = (state, action) => {
  const { index } = action.payload;
  let updatedState = [];
  if (index !== -1) {
    state.forEach((picker) => {
      console.log(index);
      console.log(picker);
      if (picker.props.index !== index) {
        updatedState = [...updatedState, state[picker.props.index]];
      }
    });
  }
  return updatedState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FIELD_PICKER:
      return addFieldPicker(state, action);
    case actionTypes.REMOVE_FIELD_PICKER:
      return removeFieldPicker(state, action);
    default:
      return state;
  }
};

export default reducer;
