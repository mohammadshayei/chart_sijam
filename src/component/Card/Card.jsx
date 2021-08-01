import React from "react";
import "./Card.scss";

import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";

const Card = React.memo((props) => {
  return (
    <div key={props.key} className="card">
      <TitleBlock chartId={props.chartId} title={props.item.title} />
      <div className="card-body">
        <ChartBlock chartId={props.chartId} chartProps={props.item} />
      </div>
    </div>
  );
});

export default Card;
