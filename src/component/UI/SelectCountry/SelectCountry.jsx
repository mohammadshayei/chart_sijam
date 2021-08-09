import React from "react";
import Button from "../Button/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { stringFa } from "../../../assets/strings/stringFaCollection";
const SelectCountry = (props) => {
  return (
    <Button
      ButtonStyle={{
        backgroundColor: "transparent",
        width: "20rem",
        justifyContent: "space-between",
        borderBottom: "rgba(0,0,0,0.5) 1px solid",
        marginBottom: "1rem",
        padding: "0rem .2rem",
        display: "flex",
      }}
      onClick={props.onClick}
      rippleColor="rgb(113, 158, 158)"
    >
      <p>{props.countryName ? props.countryName : stringFa.select}</p>
      <ExpandMoreIcon />
    </Button>
  );
};

export default SelectCountry;
