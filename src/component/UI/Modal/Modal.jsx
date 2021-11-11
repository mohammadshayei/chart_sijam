import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import { animated, useTransition } from "react-spring";

const Modal = React.memo((props) => {
  const [myClassName, setMyClassName] = useState([classes.Modal]);

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

  return transitions(
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
              ...props.style,
            }}
          >
            {props.children}
          </animated.div>
        </>
      )
  );
});
export default Modal;
