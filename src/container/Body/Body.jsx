import React from "react";
import classes from "./Body.module.scss";
import Card from "../../component/Card/Card";
import { stringFa } from "../../assets/strings/stringFa";

const Body = (props) => {
  return (
    <div className={classes.cardsContainer}>
      <Card
        title={stringFa.card_title[0]}
        chartType='Bar'
      />
      <Card
        title={stringFa.card_title[1]}
        chartType='Line'
      />
      <Card
        title={stringFa.card_title[2]}
        chartType='Radar'
      />
    </div>
  );
};
export default Body;
