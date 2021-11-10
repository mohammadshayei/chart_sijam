import React from "react";
import { animated, useSpring } from "react-spring";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const spring = useSpring({
    opacity: props.show ? 1 : 0,
    from: { opacity: 0 },
  });

  return props.show ? (
    <animated.div
      className={classes.Backdrop}
      onClick={props.clicked}
      style={spring}
    ></animated.div>
  ) : null;
};

export default Backdrop;
