import React, { useRef } from "react";
import "./InputAnimatedTitle.scss";
const InputAnimatedTitle = (props) => {
  const inputRef = useRef();
  const onClickHandler =e=>{
      inputRef.current.focus()    
  }
  return (
    <div
      className={`input-animated-container ${props.divClassName}`}
      style={{ ...props.divStyle }}
      onClick={onClickHandler}
    >
      <p className={`p-animated-blur-class ${props.pClassName}`}>
        {props.title}
      </p>
      <input
        ref={inputRef}
        className={`input-animated-class ${props.inputClassName}`}
        style={{ ...props.inputStyle }}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        {...props.config}
      />
      {!props.isValid ? (
        <p className="p-animated-error">{props.messageError}</p>
      ) : null}
    </div>
  );
};

export default InputAnimatedTitle;
