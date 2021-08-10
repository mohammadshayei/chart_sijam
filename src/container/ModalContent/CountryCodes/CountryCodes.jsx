import React, { useState } from "react";
import "./CountryCodes.scss";
import { countryCodes } from "../../../assets/DummyData/CountryCode";
import Search from "../../../component/UI/Search/Search";
import { stringFa } from "../../../assets/strings/stringFaCollection";

const CountryCodesItem = (props) => {
  return (
    <div onClick={props.onClick} className="country-code-item-container">
      <p>{props.content.dial_code}</p>
      <p>{props.content.name}</p>
    </div>
  );
};

const CountryCodes = (props) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(countryCodes);
  const onClickItem=(e,item)=>{
    props.setResult(item)
    props.closeModal()
  }
  const onChange = (e) => {
    setValue(e.target.value);
    const newData = countryCodes.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(newData);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (data.length > 0) props.setResult(data[0]);
    props.closeModal()
  };
  let CountriesCode = data.map((country) => (
    <CountryCodesItem key={country.name} onClick={(e)=>onClickItem(e,country)} content={country} />
  ));
  return (
    <form onSubmit={onSubmitHandler} className="countrycode-container">
      <Search
        value={value}
        onChange={onChange}
        config={{ placeholder: stringFa.search, type: "text" }}
        iconStyle={{
          fontSize: "2rem",
          fontWeight: "100",
          margin: "0",
          marginBottom: "1.6rem",
        }}
        inputStyle={{
          border: "none",
          borderBottom: "1px solid black",
          margin: "0",
        }}
      />
      <div className="countrycode-content">
        {CountriesCode.length > 0 ? (
          CountriesCode
        ) : (
          <p style={{ textAlign: "center" }}>{stringFa.country_not_found}</p>
        )}
      </div>
    </form>
  );
};

export default CountryCodes;
