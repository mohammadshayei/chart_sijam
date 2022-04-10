import { useEffect, useState } from "react";
import "./XAxisStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import FieldPicker from "./FieldPicker.jsx";

const XAxisStep = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [pickers, setPickers] = useState([]);

  const removeFieldPicker = (index) => {
    let updatedPickers = [];
    if (index !== -1) {
      updatedPickers = pickers.filter((picker) => picker.props.index !== index)
    }
    console.log(updatedPickers);
    setPickers(updatedPickers)
  };

  const addFieldPicker = () => {
    let updatedPickers = [...pickers,
    <FieldPicker key={`${pickers.length}`} index={pickers.length} removeFieldPicker={removeFieldPicker} />]
    setPickers(updatedPickers)
  };

  useEffect(() => {
    setPickers([
      <FieldPicker key="0" title={stringFa.column_type} index={0} removeFieldPicker={removeFieldPicker} />,
      <FieldPicker key="1" title={stringFa.values} index={1} removeFieldPicker={removeFieldPicker} />,
    ])
  }, []);


  return (
    <div className="settings-content">
      {pickers && pickers.map((picker) => picker)}
      <div className="x-axis-column">
        <div className="settings-multiple-item-footer">
          <StyledButton
            onClick={() => addFieldPicker()}
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
