import React, { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
const Modal = React.memo((props) => {
  const [myClassName, setMyClassName] = useState([classes.Modal]);
  useEffect(() => {
    switch (props.type) {
      case "countries_code":
        setMyClassName([...myClassName,classes.CountriedCodeContainer]);
        break;

      default:
        break;
    }
  }, [props.type]);
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
      <div
        className={myClassName.join(" ")}
        style={{
          marginTop: props.show ? "0" : "-100vh",
          opacity: props.show ? "1" : "0",
          ...props.style,
        }}
      >
        {props.children}
      </div>
    </>
  );
});
export default Modal;
