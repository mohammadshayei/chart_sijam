import React from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import Input from "../../../component/UI/Input/Input";
import { useTheme } from "../../../styles/ThemeProvider";
import InputAnimatedTitle from "../../inputs/InputAnimatedTitle/InputAnimatedTitle";
import "./MainAuth.scss";

const MainAuth = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <form
      onSubmit={props.onsubmit}
      className="mainauth-container"
      style={{
        background: themeState.isDark ? theme.surface_2dp : theme.surface,
        borderColor: theme.border_color
      }}
    >
      <div className="mainauth-input-container">
        {Object.entries(props.orderForm).map(([k, v]) => (
          <Input
            key={k}
            elementType={`${k === "password" ? "password" : "text"}`}
            value={v.value}
            onChange={(e) => props.onChange(e, k, props.pageName)}
            isOk={v.isValid}
            title={v.title}
            messageError={v.error}
            inputContainer={{ width: "100%", marginBottom: "1rem" }}
            style={{ fontSize: "0.8rem" }}
            config={{
              autoFocus: k === "username" && true,
            }}
          />
        ))}
      </div>
      <div className="button-mainauth-container">
        <Button
          disabled={!props.formIsValid}
          ButtonStyle={{
            width: "100%",
            paddingTop: ".2rem",
            fontSize: "0.9rem"
          }}
        >
          <p>{stringFa.login}</p>
        </Button>
      </div>
    </form>
  );
};

export default MainAuth;
