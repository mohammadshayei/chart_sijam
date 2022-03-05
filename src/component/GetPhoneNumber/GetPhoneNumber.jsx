import React, { useState } from "react";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import InputPhoneNumber from "./InputPhoneNumber/InputPhoneNumber";
import CountryCodes from "../../container/ModalContent/CountryCodes/CountryCodes";
import { countryCodes } from "../../assets/DummyData/CountryCode";
import "./GetPhoneNumber.scss";
import { ImPhone } from "react-icons/im";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants/Config";
import { useTheme } from "../../styles/ThemeProvider";
import ErrorDialog from "../UI/Error/ErrorDialog";

const GetPhoneNumber = (props) => {
  const [show, setShow] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [resultCountry, setResultCountry] = useState(
    countryCodes.find((item) => item.name === "IRAN")
  );
  const [count, setCount] = useState(10);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const token = useSelector((state) => state.auth.token);
  const maxLength = 10;

  const closeModal = () => {
    setShow(false);
  };
  const onSelectCountryPicker = () => {
    setShow(true);
  };
  const onChangePhoneHanlder = (e) => {
    setPhone(e.target.value);
    setCount(maxLength - e.target.value.length);
    setIsValidPhone(e.target.value.length === 10 && e.target.value[0] === "9");
  };
  const onChangeCodeHandler = (e) => {
    setResultCountry(
      countryCodes.find((item) => item.dial_code === `+${e.target.value}`)
    );
  };
  const generate_token = (length) => {
    var a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  };
  const continueButtonHandler = async () => {
    // props.setTokenId(generate_token(30));
    setError(null)
    try {
      const resultSearchUser = await axios.post(
        `${baseUrl}api/search_user_employee`,
        {
          holdingId: "4869d699c2f046b19fbb2d0c248e5243",
          phone: `${resultCountry.dial_code === "+98" ? "0" : resultCountry.dial_code}${phone}`
        },
        { headers: { "auth-token": token } }
      );
      if (resultSearchUser.data.result.goNextPage)
        props.setPage(2)
      else if (resultSearchUser.data.result.wantToAdd)
        props.setPage(3)
    } catch (error) {
      setError(
        <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
      )
    }
  }

  return (
    <div className="getphonenumber-container">
      {error}
      <Modal show={show} modalClosed={closeModal} type="countries_code">
        <CountryCodes closeModal={closeModal} setResult={setResultCountry} />
      </Modal>
      <>
        <div className="getphonenumber-header">
          <div className="phone-icon-circle"
            style={{ borderColor: theme.primary }}>
            <ImPhone className="phone-icon" color={theme.primary} size="2rem" />
          </div>
          <h3 style={{ color: theme.primary }}>{stringFa.user_phone}</h3>
          <p style={{ color: theme.on_background }}>{stringFa.enter_phone_to_get_code}</p>
        </div>
        <div className="getphonenumber-body">
          <div className="getphonenumber-inputs-container">
            <InputPhoneNumber
              phoneValue={phone}
              onChangePhone={onChangePhoneHanlder}
              onChangeCode={onChangeCodeHandler}
              correctCode={resultCountry ? true : false}
              countryName={resultCountry ? resultCountry.name : null}
              onSelectCountryClick={onSelectCountryPicker}
              isValidPhone={isValidPhone}
              maxLength={maxLength}
              count={count}
              codeValue={
                resultCountry ? resultCountry.dial_code.replace("+", "") : null
              }
              onKeyPress={(e) => {
                if (e.key === "Enter" && isValidPhone && resultCountry && phone.length !== 0)
                  continueButtonHandler();
              }}
            />
          </div>
          <div className="button-container">
            <Button
              hoverBGColor={theme.primary_variant}
              disabled={
                !(isValidPhone && resultCountry && phone.length !== 0)
              }
              ButtonStyle={{
                width: "15rem",
                backgroundColor:
                  isValidPhone && resultCountry && phone.length !== 0
                    ? theme.primary
                    : theme.secondary,
                opacity:
                  isValidPhone && resultCountry && phone.length !== 0
                    ? 1
                    : 0.5,
                color: theme.on_primary,
                paddingTop: ".2rem",
                cursor: `${(isValidPhone && resultCountry && phone.length !== 0) ? "pointer" : "default"}`
              }}
              onClick={continueButtonHandler}
            >
              <p>{stringFa.continue}</p>
            </Button>
          </div>
        </div>
      </>
    </div>
  );
};

export default GetPhoneNumber;
