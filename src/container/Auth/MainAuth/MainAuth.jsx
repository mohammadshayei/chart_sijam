import React from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
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
      }}
    >
      <div className="mainauth-input-container">
        {Object.entries(props.orderForm).map(([k, v]) => (
          <InputAnimatedTitle
            key={k}
            onChange={(e) => props.onChange(e, k, props.pageName)}
            value={v.value}
            config={v.elementConfig}
            isValid={v.isValid}
            onBlur={(e) => props.onBlur(e, k, props.pageName)}
            onFocus={(e) => props.onFocus(e, k, props.pageName)}
            title={v.title}
            messageError={v.error}
            inputClassName={
              v.selected && v.value.length !== 0
                ? "input-animated-focus-class"
                : ""
            }
            pClassName={
              v.isFocused ? "p-animated-focus-class" : "p-animated-blur-class"
            }
            divStyle={{
              marginTop: props.pageName === "login" ? "4rem" : "2rem",
            }}
            inputStyle={{
              width: "20rem",
              borderBottom: `${
                !v.isValid
                  ? "red"
                  : v.selected
                  ? theme.background
                  : theme.borderBlur
              } ${v.selected ? "2px" : "1px"} solid`,
            }}
          />
        ))}
      </div>
      <div className="button-mainauth-container">
        <Button
          hoverBGColor={theme.hover_background}
          disabled={!props.formIsValid}
          ButtonStyle={{
            width: "15rem",
            backgroundColor: theme.background,
            color: theme.on_primary,
            paddingTop: ".2rem",
          }}
        >
          <p>{stringFa.continue}</p>
        </Button>
      </div>
    </form>
  );
};

export default MainAuth;
