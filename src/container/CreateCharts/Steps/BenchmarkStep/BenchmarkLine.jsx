import React, { useState } from "react";
import SettingsColor from "./SettingsColor.jsx";
import { MdCancel } from "react-icons/md";
import { stringFa } from "./../../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../../styles/ThemeProvider";

const BenchmarkLine = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <div key={props.propKey} className="item-list-item">
      {props.index !== "0" && (
        <div className="item-list-item-actions">
          <button
            className="sijam-style-button"
            onClick={() => props.onRemove(props.index)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              marginRight: "0.3rem",
              color: theme.on_background,
              backgroundColor: isHover
                ? theme.surface_1dp
                : theme.background_color,
            }}
          >
            <MdCancel />
          </button>
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              background: theme.background_color,
              color: theme.on_background,
              borderColor: isFocus ? theme.primary : theme.border_color,
            }}
          />
        </div>
        <div className="settings-field-component benchmark-line-label">
          <input
            type="text"
            placeholder={stringFa.benchmark_line_label}
            className="input"
            dir="rtl"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              background: theme.background_color,
              color: theme.on_background,
              borderColor: isFocus ? theme.primary : theme.border_color,
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
