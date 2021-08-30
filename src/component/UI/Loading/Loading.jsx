import React from "react";
import "./Loading.scss";
const Loading = (props) => {
  return (
    <div className="loading">
      <img
        {...props.imageConfig}
        src={process.env.PUBLIC_URL + "/logo-loading.gif"}
      />
    </div>
  );
};

export default Loading;
