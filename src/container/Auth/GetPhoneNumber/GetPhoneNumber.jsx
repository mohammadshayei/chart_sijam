import React, { useState } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import Modal from "../../../component/UI/Modal/Modal";
import SelectCountry from "../../../component/UI/SelectCountry/SelectCountry";
import InputPhoneNumber from "./InputPhoneNumber/InputPhoneNumber";
import CountryCodes from "../../ModalContent/CountryCodes/CountryCodes";
import { countryCodes } from "../../../assets/DummyData/CountryCode";
import "./GetPhoneNumber.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { Link } from "react-router-dom";

const GetPhoneNumber = (props) => {
  const [show, setShow] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [resultCountry, setResultCountry] = useState(
    countryCodes.find((item) => item.name === "IRAN")
  );
  const [count, setCount] = useState(10);
  const [phone, setPhone] = useState("");
  const themeState = useTheme();
  const theme = themeState.computedTheme;
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

  return (
    <div className="getphonenumber-container">
      <Modal show={show} modalClosed={closeModal} type="countries_code">
        <CountryCodes closeModal={closeModal} setResult={setResultCountry} />
      </Modal>
      <>
        <div className="getphonenumber-header">
          <h5>{stringFa.your_phone}</h5>
          <h6>{stringFa.select_your_country}</h6>
        </div>
        <div className="getphonenumber-body">
          <div className="getphonenumber-inputs-container">
            <SelectCountry
              onClick={onSelectCountryPicker}
              countryName={resultCountry ? resultCountry.name : null}
            />
            <InputPhoneNumber
              phoneValue={phone}
              onChangePhone={onChangePhoneHanlder}
              onChangeCode={onChangeCodeHandler}
              correctCode={resultCountry ? true : false}
              isValidPhone={isValidPhone}
              maxLength={maxLength}
              count={count}
              codeValue={
                resultCountry ? resultCountry.dial_code.replace("+", "") : null
              }
            />
          </div>
          <div className="button-container">
            <Link
              onClick={(e) =>
                !(isValidPhone && resultCountry && phone.length !== 0) &&
                e.preventDefault()
              }
              style={{ textDecoration: "none" }}
              to={{
                pathname: `/signup`,
                search: `?p=2&phone=${phone}&country_code=${
                  resultCountry && resultCountry.dial_code
                }&country_name=${resultCountry && resultCountry.name}`,
              }}
            >
              <Button
                hoverBGColor={theme.hover_background}
                disabled={
                  !(isValidPhone && resultCountry && phone.length !== 0)
                }
                ButtonStyle={{
                  width: "15rem",
                  backgroundColor:
                    isValidPhone && resultCountry && phone.length !== 0
                      ? theme.background
                      : theme.button_disabled,
                  color: theme.text_clicked_menu_color,
                  paddingTop: ".2rem",
                }}
                onClick={() => {
                  props.setTokenId(generate_token(30));
                }}
              >
                <p>{stringFa.continue}</p>
              </Button>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default GetPhoneNumber;
