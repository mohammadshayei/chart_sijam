import React, { useState } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import CountryCodes from "../../../component/ModalContent/CountryCodes/CountryCodes";
import Button from "../../../component/UI/Button/Button";
import Modal from "../../../component/UI/Modal/Modal";
import SelectCountry from "../../../component/UI/SelectCountry/SelectCountry";
import "./GetPhoneNumber.scss";
const GetPhoneNumber = () => {
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };
  const onSelectCountryPicker = () => {
    setShow(true);
  };
  return (
    <div className="getphonenumber-container">
      <Modal
        style={{
          padding: "0",
          border: "none",
        }}
        show={show}
        modalClosed={closeModal}
      >
        <CountryCodes />
      </Modal>

      <>
        <div className="getphonenumber-header">
          <h5>{stringFa.your_phone}</h5>
          <h6>{stringFa.select_your_country}</h6>
        </div>
        <div className="getphonenumber-body">
          <div className="getphonenumber-inputs-container">
            <SelectCountry onClick={onSelectCountryPicker} countryName="" />
          </div>
          <Button>ادامه</Button>
        </div>
      </>
    </div>
  );
};

export default GetPhoneNumber;
