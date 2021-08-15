import React from "react";
import "./InputCountryPhoneCode.scss";
const InputCountryPhoneCode = (props) => {
  return (
    <div className={`input-code-container ${props.divClassName}`}>
      <p>+</p>
      <input
        className={`code-input ${props.inputclassName}`}
        {...props.config}
        onChange={props.onChange}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        style={{
          ...props.inputStyle,
        }}
      />
    </div>
  );
};

export default InputCountryPhoneCode;
