import React from "react";
import Input from "../../../component/UI/Input/Input";
import "./Signup.scss";
const Signup = (props) => {
  return (
    <div className="signup-container">
      <Input
        elementType="input"
        config={{ type: "text", placeholder: "chetori mamad" }}
      />
    </div>
  );
};

export default Signup;
