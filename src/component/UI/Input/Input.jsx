import React, { useEffect, useState } from "react";
import UnderlineInput from "../../../container/inputs/UnderlineInput/UnderlineInput";
import "./Input.scss";
const Input = (props) => {
  const [inputElement, setInputElement] = useState(null);

  useEffect(() => {
    switch (props.elementType) {
      case "input":
        setInputElement(
          <input
            className={`InputElement ${
              props.invalid && props.shouldValidate && props.touched
                ? "invalid"
                : ""
            }`}
            style={props.style}
            onChange={props.onChange}
            value={props.value}
            {...props.config}
          />
        );
        break;

      default:
        setInputElement(
          <input
            className={`InputElement ${
              props.invalid && props.shouldValidate && props.touched
                ? "invalid"
                : ""
            }`}
            style={props.style}
            onChange={props.onChange}
            value={props.value}
            {...props.config}
          />
        );
        break;
    }
  }, [props.elementType, props.value]);

  return <div className="input-container">{inputElement}</div>;
};

export default Input;
