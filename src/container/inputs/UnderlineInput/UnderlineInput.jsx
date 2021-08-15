import React, { useRef } from "react";
import "./UnderlineInput.scss";
const UnderlineInput = (props) => {
  const inputRef = useRef();
  const lineWidth =
    (props.width - 2 * props.padding) / props.maxLength - props.space;
  const onChange = (e) => {
    props.onChange(e);
    if (inputRef.current.selectionEnd === props.maxLength) inputRef.current.selectionEnd=0
  };
  return (
    <div
      className="underline-input-container"
      style={{ ...props.divStyle, width: `${props.width}rem` }}
    >
      {[...new Array(props.count)].map((_, index) => {
        return (
          <div
            key={index}
            className="underline"
            style={{
              marginLeft: `${
                props.padding +
                ((props.maxLength) - props.count) * (lineWidth + props.space) +
                index * (lineWidth + props.space)
              }rem`,
              width: `${lineWidth}rem`,
            }}
          />
        );
      })}
      <input
        className={`phone-input ${props.className}`}
        {...props.config}
        ref={inputRef}
        onChange={onChange}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        style={{
          paddingLeft: `${lineWidth / 2 + props.space}rem`,
          letterSpacing:`${lineWidth-0.05}rem`,
          ...props.inputStyle,
        }}
      />
    </div>
  );
};

export default UnderlineInput;
