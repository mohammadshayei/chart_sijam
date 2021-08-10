import React, { useState } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import Button from "../../../component/UI/Button/Button";
import Modal from "../../../component/UI/Modal/Modal";
import SelectCountry from "../../../component/UI/SelectCountry/SelectCountry";
import InputPhoneNumber from "./InputPhoneNumber/InputPhoneNumber";
import CountryCodes from "../../ModalContent/CountryCodes/CountryCodes";
import { countryCodes } from "../../../assets/DummyData/CountryCode";
import "./GetPhoneNumber.scss";
const GetPhoneNumber = () => {
  const [show, setShow] = useState(false);
  const [resultCountry, setResultCountry] = useState(
    countryCodes.find((item) => item.name === "IRAN")
  );
  const [count, setCount] = useState(10)
  const [phone, setPhone] = useState("");
  const maxLength=10
  const closeModal = () => {
    setShow(false);
  };
  const onSelectCountryPicker = () => {
    setShow(true);
  };
  const onChangePhoneHanlder = (e) => {
    setPhone(e.target.value);
    setCount(maxLength-e.target.value.length)
  };
  const onChangeCodeHandler = (e) => {
    setResultCountry(countryCodes.find(item=>item.dial_code===`+${e.target.value}`))
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
          </div>
          <InputPhoneNumber
            phoneValue={phone}
            onChangePhone={onChangePhoneHanlder}
            onChangeCode={onChangeCodeHandler}
            maxLength={maxLength}
            count={count}
            codeValue={resultCountry ? resultCountry.dial_code.replace('+','') : null}
          />
          <Button>ادامه</Button>
        </div>
      </>
    </div>
  );
};

export default GetPhoneNumber;
