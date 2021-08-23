import React, { useState } from "react";
import SettingsColor from "./SettingsColor.jsx";
import { MdCancel } from "react-icons/md";
import { stringFa } from "./../../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../../styles/ThemeProvider";
import StyledButton from "./../../../../component/UI/Button/StyledButton";

const BenchmarkLine = (props) => {
  const [inputsOrder, setInputsOrder] = useState({
    0: { isFocus: false },
    1: { isFocus: false },
  });
  const handleFocus = (index) => {
    let updatedOrder = { ...inputsOrder };
    index === 0
      ? (updatedOrder = { 0: { isFocus: true }, 1: { isFocus: false } })
      : (updatedOrder = { 0: { isFocus: false }, 1: { isFocus: true } });
    setInputsOrder(updatedOrder);
  };
  const handleBlur = (index) => {
    let updatedOrder = { ...inputsOrder, [index]: { isFocus: false } };
    setInputsOrder(updatedOrder);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <div key={props.propKey} className="item-list-item">
      {props.index !== "0" && (
        <div className="item-list-item-actions">
          <StyledButton
            onClick={() => props.onRemove(props.index)}
            ButtonStyle={{ marginRight: "0.3rem" }}
            hover={
              themeState.isDark ? theme.surface_1dp : theme.background_color
            }
          >
            <MdCancel />
          </StyledButton>
        </div>
      )}
      <div className="settings-field-component item-list-item-field">
        <div className="settings-field-component benchmark-line-value">
          <div className="settings-field-title-wrapper">
            <div className="settings-field-title">
              <div>{stringFa.benchmark_line}</div>
            </div>
          </div>
          <input
            type="text"
            placeholder={stringFa.number_value}
            className="input"
            dir="rtl"
            onFocus={() => handleFocus(0)}
            onBlur={() => handleBlur(0)}
            style={{
              background: themeState.isDark
                ? theme.background_color
                : theme.surface,
              color: theme.on_background,
              borderColor: inputsOrder[0].isFocus
                ? theme.primary
                : theme.border_color,
            }}
          />
        </div>
        <div className="settings-field-component benchmark-line-label">
          <input
            type="text"
            placeholder={stringFa.benchmark_line_label}
            className="input"
            dir="rtl"
            onFocus={() => handleFocus(1)}
            onBlur={() => handleBlur(1)}
            style={{
              background: themeState.isDark
                ? theme.background_color
                : theme.surface,
              color: theme.on_background,
              borderColor: inputsOrder[1].isFocus
                ? theme.primary
                : theme.border_color,
            }}
          />
        </div>
        <div className="settings-field-component">
          <SettingsColor />
        </div>
      </div>
    </div>
  );
};

export default BenchmarkLine;
