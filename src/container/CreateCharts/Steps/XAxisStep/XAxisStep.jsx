import React, { useState, useEffect } from "react";
import "./XAxisStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import FieldPicker from "./FieldPicker.jsx";

const XAxisStep = () => {
  let onRemoveHandler;
  const [pickers, setPickers] = useState([
    <FieldPicker
      key="0"
      title={stringFa.column_type}
      onRemove={onRemoveHandler}
      index={0}
    />,
    <FieldPicker
      key="1"
      title={stringFa.values}
      onRemove={onRemoveHandler}
      index={1}
    />,
  ]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  onRemoveHandler = (index) => {
    let newArray = [...pickers];
    if (index !== -1) {
      newArray.splice(index, 1);
      setPickers(newArray);
    }
  };

  return (
    <div className="settings-content">
      {pickers.map((picker) => picker)}
      <div className="x-axis-column">
        <div className="settings-multiple-item-footer">
          <StyledButton
            onClick={() =>
              setPickers([
                ...pickers,
                <FieldPicker
                  key={`${pickers.length}`}
                  onRemove={onRemoveHandler}
                  index={pickers.length}
                />,
              ])
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
