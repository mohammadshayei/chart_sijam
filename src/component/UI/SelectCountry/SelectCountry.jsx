import React from "react";
import Button from "../Button/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { lightTheme } from "../../../styles/theme";
const SelectCountry = (props) => {
  return (
    <Button
      ButtonStyle={{
        backgroundColor: "transparent",
        width: "20rem",
        justifyContent: "space-between",
        borderRadius:'0',
        borderBottom:`${lightTheme.borderBlur} 1px solid`,
        marginBottom: "1rem",
        padding: "0rem .2rem",
        display: "flex",
      }}
      onClick={props.onClick}
      rippleColor={lightTheme.background}
    >
      <p>{props.countryName ? props.countryName : stringFa.country_not_found}</p>
      <ExpandMoreIcon />
    </Button>
  );
};

export default SelectCountry;
