import React from "react";
import { lightTheme } from "../../../styles/theme";
import "./CheckBox.scss";

const CheckBox = (props) => {
  const inputChangeHandler = (e) => {
    // if (e.target.checked) {
    //   props.changed(true);
    // } else {
    //   props.changed(false);
    // }
  };
  return (
    <div
      className="CheckBoxContent"
      style={{
        ...props.style,
        border: `1px solid rgba(56,56,56,0.09)`,
        borderRadius:'.2rem',
      }}
    >
      <span>{props.title}</span>
      <input
        onChange={inputChangeHandler}
        type="checkbox"
        className='CheckBox'
        checked={props.value}
      />
    </div>
  );
};
export default CheckBox;
