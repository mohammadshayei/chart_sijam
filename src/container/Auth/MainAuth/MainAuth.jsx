import React from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import { lightTheme } from "../../../styles/theme";
import InputAnimatedTitle from "../../inputs/InputAnimatedTitle/InputAnimatedTitle";
import "./MainAuth.scss";
const MainAuth = (props) => {
  return (
    <form onSubmit={props.onsubmit} className="mainauth-container">
      {Object.entries(props.orderForm).map(([k, v]) => (
        <InputAnimatedTitle
          key={k}
          onChange={(e) => props.onChange(e, k,props.pageName)}
          value={v.value}
          config={v.elementConfig}
          isValid={v.isValid}
          onBlur={(e) => props.onBlur(e, k,props.pageName)}
          onFocus={(e) => props.onFocus(e, k,props.pageName)}
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
          inputStyle={{
            width: "20rem",
            borderBottom: `${
              !v.isValid
                ? "red"
                : v.selected
                ? lightTheme.background
                : lightTheme.borderBlur
            } ${v.selected ? "2px" : "1px"} solid`,
          }}
        />
      ))}
      <div className='button-mainauth-container'>
        <Button
          hoverBGColor={lightTheme.hover_background}
          disabled={!props.formIsValid}
          ButtonStyle={{
            width: "15rem",
            backgroundColor: lightTheme.background,
            color: lightTheme.text_clicked_menu_color,
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
