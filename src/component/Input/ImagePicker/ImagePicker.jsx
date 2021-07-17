import React,{useRef,useCallback} from "react";
import "./ImagePicker.scss";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { lightTheme } from "../../../styles/theme";
const ImagePicker = (props) => {
  const imageRef=useRef()
  const uploadButtonClickHandler = useCallback(() => {
    imageRef.current.click();
}, [])
  return (
    <div
      className="ImagePickerContainer"
      onClick={uploadButtonClickHandler}
    >
      <input type="file" style={{display:'none'}} ref={imageRef} onChange={props.onChangeHandler} />
      <AddRoundedIcon style={{fontSize:'2.5rem' ,color:lightTheme.clicked_darken_color}} />
    </div>
  );
};

export default ImagePicker;
