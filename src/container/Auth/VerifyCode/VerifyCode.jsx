import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import { lightTheme } from "../../../styles/theme";
import UnderlineInput from "../../inputs/UnderlineInput/UnderlineInput";
import "./VerifyCode.scss";
const VerifyCode = (props) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(5);
  const locaiton = useLocation();
  const searchParams = new URLSearchParams(locaiton.search);
  const phone = searchParams.get("phone");
  const country_code = searchParams.get("country_code");
  const maxLength = 5;
  const onChange = (e) => {
    setValue(e.target.value);
    setCount(maxLength - e.target.value.length);
  };
  const onClickButtonContinueHandler = (e) => {
    props.setStage(1);
  };
  return (
    <div className="verify-code-container">
      <div className="header-verify-contianer">
        <h5>لطفا کد ارسال شده را وارد کنید</h5>
      </div>
      <UnderlineInput
        config={{
          type: "text",
          placeholder: "",
          maxLength: maxLength,
        }}
        onChange={onChange}
        value={value}
        onFocus={() => {
          setSelected("phone");
        }}
        onBlur={() => {
          setSelected("");
        }}
        maxLength={maxLength}
        count={count}
        padding={0.5}
        space={0.5}
        width={15}
        inputStyle={{
          borderBottom: `${
            selected === "phone" ? lightTheme.background : lightTheme.borderBlur
          } ${selected === "phone" ? "2px" : "1px"} solid`,
        }}
      />
      <div className="button-verify-container">
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/signup",
            search: `?p=3&token=${props.tokenId}&phone=${phone}&country_code=+${country_code.trim()}`,
          }}
        >
          <Button
            hoverBGColor={lightTheme.hover_background}
            disabled={count > 0}
            ButtonStyle={{
              width: "15rem",
              backgroundColor:
                value.length === 5
                  ? lightTheme.background
                  : lightTheme.button_disabled,
              color: lightTheme.text_clicked_menu_color,
              paddingTop: ".2rem",
            }}
          >
            <p>{stringFa.confirm}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyCode;
