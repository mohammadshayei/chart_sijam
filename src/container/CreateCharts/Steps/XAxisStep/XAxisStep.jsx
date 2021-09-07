import React from "react";
import "./XAxisStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import * as fieldPickerActions from "../../../../store/actions/fieldPicker";
import FieldPicker from "./FieldPicker.jsx";
import { useSelector, useDispatch } from "react-redux";

const XAxisStep = () => {
  const pickers = useSelector((state) => state.fieldPicker);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const addFieldPicker = (fieldPicker) => {
    dispatch(fieldPickerActions.addFieldPicker(fieldPicker));
  };

  return (
    <div className="settings-content">
      {pickers && pickers.map((picker) => picker)}
      <div className="x-axis-column">
        <div className="settings-multiple-item-footer">
          <StyledButton
            onClick={() =>
              addFieldPicker(
                <FieldPicker key={`${pickers.length}`} index={pickers.length} />
              )
            }
            hover={
              themeState.isDark ? theme.surface_1dp : theme.background_color
            }
          >
            {stringFa.add_value}
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default XAxisStep;
