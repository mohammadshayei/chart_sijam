import React, { useState } from "react";
import "./InputPhoneNumber.scss";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTheme } from "../../../styles/ThemeProvider";
import { stringFa } from "../../../assets/strings/stringFaCollection";

const InputPhoneNumber = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="input-phone-container">
      <div className="input-code-container">
        <Button
          ButtonStyle={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: theme.on_background,
            width: "1.2rem",
            padding: "0",
            left: "0",
            zIndex: "9"
          }}
          onClick={props.onSelectCountryClick}
          rippleColor={theme.background}
        >
          <ExpandMoreIcon />
        </Button>
        <p>+</p>
        <Input
          elementType="input"
          onChange={props.onChangeCode}
          value={props.codeValue}
          style={{
            width: "100%",
            paddingLeft: "2rem",
            fontSize: "1rem",
            direction: "ltr"
          }}
          config={{ maxLength: 4 }}
          isOk={props.correctCode}
        />
      </div>
      <Input
        elementType="input"
        config={{
          placeholder: stringFa.phone_number,
          maxLength: 10,
          onKeyPress: props.onKeyPress,
          autoFocus: true,
        }}
        onChange={props.onChangePhone}
        value={props.phoneValue}
        style={{
          direction: "ltr",
          ...props.inputStyle,
        }}
        isOk={props.isValidPhone}
      />
      <p style={{ color: theme.error }}>
        {!props.countryName && stringFa.country_not_found}
      </p>
    </div>
  );
};

export default InputPhoneNumber;
