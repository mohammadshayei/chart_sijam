import React, { useState } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import { lightTheme } from "../../../styles/theme";
import InputAnimatedTitle from "../../inputs/InputAnimatedTitle/InputAnimatedTitle";
import "./Signup.scss";
const Signup = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
    namefamily: {
      elementType: "InputAnimatedTitle",
      elementConfig: {
        type: "text",
      },
      value: "",
      title: stringFa.namefamily,
      error: stringFa.namefamily_error,
      isValid: true,
      validation: {
        isRequired: true,
        minLength: 3,
      },
      isFocused: false,
      selected: false,
    },
    username: {
      elementType: "InputAnimatedTitle",
      elementConfig: {
        type: "text",
      },
      title: stringFa.username,
      error: stringFa.username_error,
      value: "",
      isValid: true,
      validation: {
        isRequired: true,
        minLength: 3,
      },
      isFocused: false,
      selected: false,
    },
    password: {
      elementType: "InputAnimatedTitle",
      elementConfig: {
        type: "password",
      },
      title: stringFa.password,
      error: stringFa.password_error,
      value: "",
      isValid: true,
      validation: {
        minLength: 6,
      },
      isFocused: false,
      selected: false,
    },
  });

  const checkValidaty = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };
  const onChange = (e, key) => {
    let UpdatedOrderForm = { ...orderForm };
    let updatedFormElement = UpdatedOrderForm[key];
    updatedFormElement.value = e.target.value;
    updatedFormElement.isValid = checkValidaty(
      e.target.value,
      updatedFormElement.validation
    );
    UpdatedOrderForm[key] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in UpdatedOrderForm) {
      formIsValid = UpdatedOrderForm[inputIdentifier].isValid && formIsValid;
    }

    setFormIsValid(formIsValid);
    setOrderForm(UpdatedOrderForm);
  };
  const onFocus = (e, key) => {
    let UpdatedOrderForm = { ...orderForm };
    let updatedFormElement = UpdatedOrderForm[key];
    updatedFormElement.isFocused = true;
    updatedFormElement.selected = true;
    UpdatedOrderForm[key] = updatedFormElement;
    setOrderForm(UpdatedOrderForm);
  };
  const onBlur = (e, key) => {
    let UpdatedOrderForm = { ...orderForm };
    let updatedFormElement = UpdatedOrderForm[key];
    if (UpdatedOrderForm[key].value.length === 0)
      updatedFormElement.isFocused = false;
    updatedFormElement.selected = false;
    UpdatedOrderForm[key] = updatedFormElement;
    setOrderForm(UpdatedOrderForm);
  };
  const onsubmitHandler = (e) => {
    e.preventDefault();
    alert('helo')
  };
  return (
    <form onSubmit={onsubmitHandler} className="signup-container">
      {Object.entries(orderForm).map(([k, v]) => (
        <InputAnimatedTitle
          key={k}
          onChange={(e) => onChange(e, k)}
          value={v.value}
          config={v.elementConfig}
          isValid={v.isValid}
          onBlur={(e) => onBlur(e, k)}
          onFocus={(e) => onFocus(e, k)}
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
      <div className='button-signup-container'>
        <Button
          hoverBGColor={lightTheme.hover_background}
          disabled={!formIsValid}
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

export default Signup;
