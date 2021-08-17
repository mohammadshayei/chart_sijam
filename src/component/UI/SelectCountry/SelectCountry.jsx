import React from "react";
import Button from "../Button/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";

const SelectCountry = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <Button
      ButtonStyle={{
        backgroundColor: "transparent",
        width: "20rem",
        justifyContent: "space-between",
        borderRadius: "0",
        // borderBottom:`${theme.borderBlur} 1px solid`,
        borderBottom: `${
          !props.countryName ? "red" : theme.background
        } 1px solid`,
        marginBottom: "1rem",
        padding: "0rem .2rem",
        display: "flex",
      }}
      onClick={props.onClick}
      rippleColor={theme.background}
    >
      <p>
        {props.countryName ? props.countryName : stringFa.country_not_found}
      </p>
      <ExpandMoreIcon />
    </Button>
  );
};

export default SelectCountry;
