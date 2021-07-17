import React from "react";
import "./Image.scss";
const ImagePicker = (props) => {
  return (
    <div
      className="ImageContainer"
    >
      <img src={props.image} alt="image" />
    </div>
  );
};

export default ImagePicker;
