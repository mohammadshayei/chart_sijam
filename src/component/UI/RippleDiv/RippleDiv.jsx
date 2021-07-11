import React from "react";
const RippleDiv = (props) => {
  return <div className='RippleContainer' {...props.action}>
      {props.childred}
  </div>;
};

export default RippleDiv;
