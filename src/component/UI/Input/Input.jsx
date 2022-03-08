import React, { useEffect, useState } from "react";
// import UnderlineInput from "../../../container/inputs/UnderlineInput/UnderlineInput";
import { useTheme } from "../../../styles/ThemeProvider";
import OTPInput from "../OTPInput/OTPInput";
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
              borderColor: props.isOk ?
                (focus ? theme.primary : theme.darken_border_color)
                :
                (theme.error),
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
      case "otp":
        setInputElement(
          <OTPInput
            boxes={props.boxes}
            style={{
              background: themeState.isDark
                ? theme.surface_1dp
                : theme.surface,
              color: theme.on_background,
              ...props.style,
            }}
            onChange={props.onChange}
            config={{ ...props.config }}
            isOk={props.isOk}
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
              borderColor: props.isOk ?
                (focus ? theme.primary : theme.darken_border_color)
                :
                (theme.error),
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

  return <div className="input-container" style={{ ...props.inputContainer }}>
    {props.title &&
      <div className="input-title" style={{ ...props.inputTitle }}
      >{props.title}
      </div>}
    {inputElement}
    {!props.isOk &&
      <div className="error-massage"
        style={{ color: theme.error, ...props.inputError }}
      >{props.messageError}
      </div>}
  </div>;
};

export default Input;
