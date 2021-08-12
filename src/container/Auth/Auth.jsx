import React, { useState } from "react";
import { Redirect, useLocation } from "react-router";
import Logo from "../../component/UI/Logo/Logo";
import "./Auth.scss";
import GetPhoneNumber from "./GetPhoneNumber/GetPhoneNumber";
import ImageSection from "./ImageSection/ImageSection";
import Signup from "./Signup/Signup";
import VerifyCode from "./VerifyCode/VerifyCode";
const Auth = (props) => {
  const [tokenId, setTokenId] = useState("");
  const locaiton = useLocation();
  const searchParams = new URLSearchParams(locaiton.search);
  const p = searchParams.get("p");
  const phone = searchParams.get("phone");
  const country_code = searchParams.get("country_code");
  const country_name = searchParams.get("country_name");
  const token = searchParams.get("token");

  let body = null;
  switch (p) {
    case "1":
      if (phone || country_code || token === tokenId || country_name) {
        body = (
          <Redirect
            to={{
              pathname: "/signup",
              search: "?p=1",
            }}
          />
        );
      } else body = <GetPhoneNumber setTokenId={setTokenId} />;
      break;
    case "2":
      if (phone && country_code && country_name)
        body = <VerifyCode tokenId={tokenId} />;
      else
        body = (
          <Redirect
            to={{
              pathname: "/signup",
              search: "?p=1",
            }}
          />
        );
      break;
    case "3":
      if (phone && country_code && token === tokenId)
        body = <Signup tokenId={tokenId} />;
      else {
        body = (
          <Redirect
            to={{
              pathname: "/signup",
              search: "?p=1",
            }}
          />
        );
      }
      break;

    default:
      body = <GetPhoneNumber />;
      break;
  }
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
        <div className="auth-body">{body}</div>
      </div>
    </div>
  );
};
export default Auth;
