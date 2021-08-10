import React, { useState } from "react";
import { lightTheme } from "../../../../styles/theme";
import InputCountryPhoneCode from "../../../inputs/InputCountryPhoneCode/InputCountryPhoneCode";
import UnderlineInput from "../../../inputs/UnderlineInput/UnderlineInput";
import "./InputPhoneNumber.scss";
const InputPhoneNumber = (props) => {
  const [selected, setSelected] = useState("code");
  return (
    <div className="input-phone-container">
        <InputCountryPhoneCode 
            config={{
                maxLength:4,
                type:'text',
                placeholder:'',

            }}
            onChange={props.onChangeCode}
            value={props.codeValue}
            onFocus={() => {
              setSelected("code");
            }}
            onBlur={() => {
              setSelected("");
            }}
            inputStyle={{
              borderBottom: `${
                selected === "code" ? lightTheme.background : lightTheme.borderBlur
              } ${selected === "code" ? "2px" : "1px"} solid`,
            }}
        />
      <UnderlineInput
        className="phone-input"
        config={{
          type: "text",
          placeholder: "",
          maxLength: 10,
        }}
        onChange={props.onChangePhone}
        value={props.phoneValue}
        onFocus={() => {
          setSelected("phone");
        }}
        onBlur={() => {
          setSelected("");
        }}
        maxLength={props.maxLength}
        count={props.count}
        padding={0.5}
        space={0.5}
        width={15}
        inputStyle={{
          borderBottom: `${
            selected === "phone" ? lightTheme.background : lightTheme.borderBlur
          } ${selected === "phone" ? "2px" : "1px"} solid`,
        }}
      />
    </div>
  );
};

export default InputPhoneNumber;
