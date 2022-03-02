import React, { useEffect, useState } from "react";
// import UnderlineInput from "../../../container/inputs/UnderlineInput/UnderlineInput";
import { useTheme } from "../../../styles/ThemeProvider";
import "./Input.scss";

const Input = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [inputElement, setInputElement] = useState(null);
  const [focus, setFocus] = useState(false);

  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };

  useEffect(() => {
    switch (props.elementType) {
      case "input":
        setInputElement(
          <input
            className={`InputElement ${props.invalid && props.shouldValidate && props.touched
              ? "invalid"
              : ""
              }`}
            style={{
              background: themeState.isDark
                ? theme.surface_1dp
                : theme.surface,
              color: theme.on_background,
              borderColor: focus ? theme.primary : theme.border_color,
              ...props.style,
            }}
            onChange={props.onChange}
            value={props.value}
            {...props.config}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
        );
        break;

      default:
        setInputElement(
          <input
            className={`InputElement ${props.invalid && props.shouldValidate && props.touched
              ? "invalid"
              : ""
              }`}
            style={{
              background: themeState.isDark
                ? theme.surface_1dp
                : theme.surface,
              color: theme.on_background,
              borderColor: focus ? theme.primary : theme.border_color,
              ...props.style,
            }}
            onChange={props.onChange}
            value={props.value}
            {...props.config}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
        );
        break;
    }
  }, [props.elementType, props.value, focus, themeState.isDark]);

  return <div className="input-container" style={{ ...props.inputContainer }}>{inputElement}</div>;
};

export default Input;
