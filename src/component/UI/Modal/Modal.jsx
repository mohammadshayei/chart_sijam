import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import { animated, useTransition } from "react-spring";
import { createPortal } from "react-dom";
import { useTheme } from "../../../styles/ThemeProvider";

const Modal = React.memo((props) => {
  const [myClassName, setMyClassName] = useState([classes.Modal]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const transitions = useTransition(props.show, {
    from: {
      opacity: 0,
      transform: "translate(-50%,-52%)",
      pointerEvents: "none",
    },
    enter: {
      opacity: 1,
      transform: "translate(-50%,-50%)",
      pointerEvents: "auto",
    },
    leave: {
      opacity: 0,
      transform: "translate(-50%,-48%)",
      pointerEvents: "none",
    },
    config: { friction: 20 },
  });

  useEffect(() => {
    switch (props.type) {
      case "countries_code":
        setMyClassName([...myClassName, classes.CountriedCodeContainer]);
        break;

      default:
        break;
    }
  }, [props.type]);

  return createPortal(
    transitions(
      (styles, item) =>
        item && (
          <>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
            <animated.div
              className={myClassName.join(" ")}
              style={{
                opacity: styles.opacity,
                transform: styles.transform,
                pointerEvents: styles.pointerEvents,
                color: theme.on_background,
                backgroundColor: themeState.isDark
                  ? theme.background_color
                  : theme.surface,
                ...props.style,
              }}
            >
              {props.children}
            </animated.div>
          </>
        )
    ),
    document.getElementById("portal")
  );
});
export default Modal;
