import React, {  } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
const Modal = React.memo(props=>{
    let myClassName=[classes.Modal]
    if(props.className)myClassName.push(props.className)
  return (
    <>
      <Backdrop
        show={props.show}
        clicked={props.modalClosed}
      ></Backdrop>
      <div
        className={myClassName.join(' ')}
        style={{
          marginTop: props.show ? "0" : "-100vh",
          opacity: props.show ? "1" : "0",
          ...props.style
        }}
      >
        {props.children}
      </div>
    </>
  );
});
export default Modal;
