import { useEffect, useState } from "react";
import "./XAxisStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import FieldPicker from "./FieldPicker.jsx";
import { useSelector } from "react-redux";

const XAxisStep = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const takenData = useSelector((state) => state.addChart);
  const [pickers, setPickers] = useState([]);

  const removeFieldPicker = (index) => {
    let updatedPickers = [];
    if (index < 0) return;
    if (index === pickers.length - 1)
      updatedPickers = pickers.filter(item => item.props.index !== index)
    else {
      let edited = false;
      pickers.forEach((item, indx) => {
        if (!edited) {
          if (item.props.index === index) edited = true;
          else updatedPickers.push(item)
        } else {
          updatedPickers.push({
            ...item,
            key: `${indx - 1}`,
            props: {
              ...item.props,
              index: indx - 1
            }
          })
        }

      })
    }
    setPickers(updatedPickers)
  };

  const addFieldPicker = () => {
    let updatedPickers = [...pickers,
    <FieldPicker key={`${pickers.length}`} index={pickers.length} removeFieldPicker={removeFieldPicker} />]
    setPickers(updatedPickers)
  };

  useEffect(() => {
    setPickers([
      <FieldPicker key="0" title={stringFa.column_type} index={0}
        removeFieldPicker={removeFieldPicker}
        error={takenData.emptyRequireds.includes("category")} />,
      <FieldPicker key="1" title={stringFa.values} index={1}
        removeFieldPicker={removeFieldPicker}
        error={takenData.emptyRequireds.includes("field1")} />,
    ])
  }, [takenData.emptyRequireds]);

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
