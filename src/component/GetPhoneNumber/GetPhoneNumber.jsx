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
import { baseUrl, MELI_PAYAMAK_URL } from "../../constants/Config";
import { useTheme } from "../../styles/ThemeProvider";
import ErrorDialog from "../UI/Error/ErrorDialog";
import { useSelector } from "react-redux";

const GetPhoneNumber = (props) => {
  const [show, setShow] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [resultCountry, setResultCountry] = useState(
    countryCodes.find((item) => item.name === "IRAN")
  );
  const [count, setCount] = useState(10);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const token = useSelector((state) => state.auth.token);
  const { selectedHolding} = useSelector((state) => state.holdingDetail);
  const maxLength = 10;

  const closeModal = () => {
    setShow(false);
  };
  const onSelectCountryPicker = () => {
    setShow(true);
  };
  const onChangePhoneHanlder = (e) => {
    setPhone(e.target.value);
    props.setPhone(`${resultCountry.dial_code === "+98" ? "0" : resultCountry.dial_code}${e.target.value}`)
    setCount(maxLength - e.target.value.length);
    setIsValidPhone(e.target.value.length === 10 && e.target.value[0] === "9");
  };
  const onChangeCodeHandler = (e) => {
    setResultCountry(
      countryCodes.find((item) => item.dial_code === `+${e.target.value}`)
    );
  };
  const sendSms = async (text, to) => {
    props.setError(null)
    const payload = {
      username: '09354598847',
      password: 'Mohammad@1378',
      text,
      to,
      bodyId: '49928'
    }
    try {
      setLoading(true)
      const result = await axios.post(MELI_PAYAMAK_URL, payload);
      if (result.data.RetStatus === 1) {
        setLoading(false)
        props.setPage(2)
      }
    } catch (error) {
      props.setError(
        <ErrorDialog onClose={props.setError}>{stringFa.error_occured_try_again}</ErrorDialog>
      )
    }
  }
  const continueButtonHandler = async () => {
    try {
      props.setError(null)
      const resultSearchUser = await axios.post(
        `${baseUrl}api/search_user_employee`,
        {
          holdingId: selectedHolding.holdingId,
          phone: `${resultCountry.dial_code === "+98" ? "0" : resultCountry.dial_code}${phone}`
        },
        { headers: { "auth-token": token } }
      );
      if (resultSearchUser.data.result.goNextPage) {
        const code = Math.floor(Math.random() * 90001) + 10000
        props.setOtp(code)
        sendSms(code, props.phone)
      }
      else if (resultSearchUser.data.result.wantToAdd)
        props.setPage(3)
      else
        props.setError(
          <ErrorDialog onClose={props.setError}>{resultSearchUser.data.result.message}</ErrorDialog>
        )
    } catch (error) {
      props.setError(
        <ErrorDialog onClose={props.setError}>{stringFa.error_message}</ErrorDialog>
      )
    }
  }

  return (
    <div className="get-phonenumber-container">
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
              disabled={
                (!(isValidPhone && resultCountry && phone.length !== 0) || loading)
              }
              ButtonStyle={{
                width: "15rem",
                paddingTop: ".2rem",
              }}
              onClick={continueButtonHandler}
              loading={loading}
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