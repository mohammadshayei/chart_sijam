import React from "react";
import { animated, useSpring } from "react-spring";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const spring = useSpring({
    opacity: props.show ? 1 : 0,
    pointerEvents: props.show ? "auto" : "none",
    from: { opacity: 0, pointerEvents: "none" },
  });

  return (
    <animated.div
      className={classes.Backdrop}
      onClick={props.clicked}
      style={spring}
    ></animated.div>
  );
};

export default Backdrop;
