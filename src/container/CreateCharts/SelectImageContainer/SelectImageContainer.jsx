import React, { useState } from "react";
import { lightTheme } from "../../../styles/theme";
import Image from '../../../component/UI/Image/Image'
import "./SelectImageContainer.scss";
import ImagePicker from "../../../component/Input/ImagePicker/ImagePicker";
const SelectImageContainer = (props) => {
  const [imageFile, setImageFile] = useState([]);
  const changeHandler = (event) => {
    setImageFile([...imageFile, URL.createObjectURL(event.target.files[0])]);
  };
  return (
    <div
      className="SelectImageContainerContainer"
      style={{ backgroundColor: lightTheme.background_color }}
    >
      {imageFile.map((image) => (
          <Image image={image} />
      ))}
      <ImagePicker onChangeHandler={changeHandler} />
    </div>
  );
};
export default SelectImageContainer;
