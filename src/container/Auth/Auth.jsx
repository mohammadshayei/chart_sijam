import React from "react";
import Logo from "../../component/UI/Logo/Logo";
import "./Auth.scss";
import GetPhoneNumber from "./GetPhoneNumber/GetPhoneNumber";
import ImageSection from "./ImageSection/ImageSection";
import Signup from "./Signup/Signup";
const Auth = () => {
  return (
    <div className="auth-container">
      <ImageSection />
      <div className="auth-content">
        <Logo
          style={{
            height: "4rem",
            margin: "1rem 0rem",
            backgroundColor: "transparent",
          }}
        />
        <div className="auth-body">
          <GetPhoneNumber />
        </div>
        {/* <Signup/> */}
      </div>
    </div>
  );
};
export default Auth;
