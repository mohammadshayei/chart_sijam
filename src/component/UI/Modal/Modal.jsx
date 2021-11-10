import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import { animated, useTransition } from "react-spring";

const Modal = React.memo((props) => {
  const [myClassName, setMyClassName] = useState([classes.Modal]);

  const transitions = useTransition(props.show, {
    from: { opacity: 0, transform: "translate(-50%,-55%)" },
    enter: { opacity: 1, transform: "translate(-50%,-50%)" },
    leave: {
      opacity: 0,
      transform: "translate(-50%,-45%)",
    },
    delay: 2,
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
              delay: styles.delay,
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
