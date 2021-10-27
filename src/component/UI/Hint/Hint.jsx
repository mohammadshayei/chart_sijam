import React from "react";
import "./Hint.scss";
const Hint = (props) => {
  return (
    <div className="tooltip-tip-container" style={{ ...props.tooltipStyle }}>
      <p>{props.hint}</p>
      <div className="arrow-tooltip" style={{ ...props.arrowStyle }} />
    </div>
  );
};

export default Hint;
