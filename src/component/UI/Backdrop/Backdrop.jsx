import React from "react";
import { animated, useSpring } from "react-spring";
import { useTheme } from "../../../styles/ThemeProvider";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  const themeState = useTheme();
  const spring = useSpring({
    backgroundColor: themeState.isDark ? "rgba(150, 150, 150, 0.2)" : "rgba(0, 0, 0, 0.2)",
    opacity: props.show ? 1 : 0,
    pointerEvents: props.show ? "auto" : "none",
    from: { opacity: 0, pointerEvents: "none" },
  });

  return (
    <animated.div
      className={classes.Backdrop}
      onClick={props.clicked}
      style={{ ...spring, ...props.bdStyle }}
    ></animated.div>
  );
};

export default Backdrop;
