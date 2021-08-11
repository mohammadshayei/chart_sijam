import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./DropBox.scss";

const DropBox = (props) => {
  const [stepOpen, setStepOpen] = useState(props.isOpen);

  return (
    <div
      className={`step-container ${stepOpen && "open"} container-border`}
      onClick={() => {
        setStepOpen(!stepOpen);
      }}
    >
      <div className={`step-title-container ${stepOpen && "open"}`}>
        <div className="title">{props.title}</div>
        <div className={`arrow-icon ${stepOpen && "open"}`}>
          <IoIosArrowDown />
        </div>
      </div>
      <div className="step-setting-fields-container">{props.children}</div>
    </div>
  );
};

export default DropBox;
