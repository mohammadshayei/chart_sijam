import React from "react";
import "./Loading.scss";
const Loading = (props) => {
  return (
    <div className="loading" style={{...props.style}}>
      <img
        {...props.imageConfig}
        style={{...props.imageStyle}}
        src={process.env.PUBLIC_URL + "/logo-loading.gif"}
      />
    </div>
  );
};

export default Loading;
