import React, { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Logo from "../../component/UI/Logo/Logo";
import "./Auth.scss";
import GetPhoneNumber from "./GetPhoneNumber/GetPhoneNumber";
import ImageSection from "./ImageSection/ImageSection";
import MainAuth from "./MainAuth/MainAuth";
import VerifyCode from "./VerifyCode/VerifyCode";
import { baseUrl } from "../../constants/Config";
import Loading from "../../component/UI/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import ErrorDialog from "../../component/UI/Error/ErrorDialog";

const Auth = (props) => {
  const [orderAuth, setOrderAuth] = useState({
    signup: {
      orderForm: {
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
      },
      isValid: false,
    },
    login: {
      orderForm: {
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
      },
      isValid: false,
    },
  });
  const [loginError, setLoginError] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const locaiton = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(locaiton.search);
  const p = searchParams.get("p");
  const phone = searchParams.get("phone");
  const country_code = searchParams.get("country_code");
  const country_name = searchParams.get("country_name");
  const token = searchParams.get("token");

  const dispatch = useDispatch();
  const auth = (username, password, url) => {
    dispatch(actions.auth(username, password, url));
  };
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
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
  const onChange = (e, key, pageName) => {
    let UpdatedOrderAuth = { ...orderAuth };
    let UpdatedOrderForm = { ...UpdatedOrderAuth[pageName].orderForm };
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
    UpdatedOrderAuth[pageName].orderForm = UpdatedOrderForm;
    UpdatedOrderAuth[pageName].isValid = formIsValid;
    setOrderAuth(UpdatedOrderAuth);
  };
  const onFocus = (e, key, pageName) => {
    let UpdatedOrderAuth = { ...orderAuth };
    let UpdatedOrderForm = { ...UpdatedOrderAuth[pageName].orderForm };
    let updatedFormElement = UpdatedOrderForm[key];
    updatedFormElement.isFocused = true;
    updatedFormElement.selected = true;
    UpdatedOrderForm[key] = updatedFormElement;
    UpdatedOrderAuth[pageName].orderForm = UpdatedOrderForm;
    setOrderAuth(UpdatedOrderAuth);
  };
  const onBlur = (e, key, pageName) => {
    let UpdatedOrderAuth = { ...orderAuth };
    let UpdatedOrderForm = { ...UpdatedOrderAuth[pageName].orderForm };
    let updatedFormElement = UpdatedOrderForm[key];
    if (UpdatedOrderForm[key].value.length === 0)
      updatedFormElement.isFocused = false;
    updatedFormElement.selected = false;
    UpdatedOrderForm[key] = updatedFormElement;
    UpdatedOrderAuth[pageName].orderForm = UpdatedOrderForm;
    setOrderAuth(UpdatedOrderAuth);
  };
  const loginHandler = useCallback((e) => {
    e.preventDefault();
    auth(
      orderAuth.login.orderForm.username.value,
      orderAuth.login.orderForm.password.value,
      `${baseUrl}api/login`
    );
  }, []);

  useEffect(() => {
    setLoginError(error);
  }, [error]);
  const onsubmitHandler = async (e, pageName) => {
    if (pageName === "login") {
      loginHandler(e);
      // const payload = {
      //   username: orderAuth.login.orderForm.username.value,
      //   password: orderAuth.login.orderForm.password.value,
      // };
      // setIsLoading(true);
      // const result = await axios.post(`${baseUrl}api/login`, payload);
      // setIsLoading(false);
    } else {
    }
  };
  let body = null;
  if (locaiton.pathname === "/signup") {
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
        if (phone && country_code && country_name && history.action === "PUSH")
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
          body = (
            <MainAuth
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              tokenId={tokenId}
              pageName={"signup"}
              orderForm={orderAuth.signup.orderForm}
              formIsValid={orderAuth.signup.isValid}
              onsubmit={(e) => onsubmitHandler(e, "signup")}
            />
          );
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
        body = <GetPhoneNumber setTokenId={setTokenId} />;
        break;
    }
  } else if (locaiton.pathname === "/login") {
    body = (
      <MainAuth
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        tokenId={tokenId}
        pageName={"login"}
        orderForm={orderAuth.login.orderForm}
        formIsValid={orderAuth.login.isValid}
        onsubmit={(e) => onsubmitHandler(e, "login")}
      />
    );
  }
  return (
    <div className="auth-container">
      {loginError ? (
        <ErrorDialog onClose={setLoginError}>{error}</ErrorDialog>
      ) : null}
      {/* onClose={setError} */}
      <ImageSection />

      <div className="auth-body">
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading
              imageConfig={{
                opacity: "0.7",
                height: "60",
                width: "60",
                alt: "loading",
              }}
            />
            <p className="text-loading">{stringFa.please_wait}</p>
          </div>
        ) : (
          <React.Fragment>
            <Logo
              style={{
                backgroundColor: "transparent",
              }}
            />
            {body}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default Auth;
