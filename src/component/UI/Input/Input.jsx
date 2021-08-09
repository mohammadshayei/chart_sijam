import React, { useEffect, useState } from "react";
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
            className={`InputElement`}
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
