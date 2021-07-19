import React, { useEffect, useState, useRef } from "react";
import "./Card.scss";

import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";

const Card = React.memo((props) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (
      (props.item.chartType === "Line" ||
        props.item.chartType === "Doughnut" ||
        props.item.chartType === "Pie" ||
        props.item.chartType === "PolarArea" ||
        props.item.chartType === "Bar" ||
        props.item.chartType === "Radar") &&
      props.item.database
    ) {
      setChartData({
        labels: props.item.database.labels,
        datasets: props.item.database.data.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            backgroundColor:
              props.item.database.data.length === 1
                ? props.item.backGroundColor
                : props.item.backGroundColor[index],
            borderColor:
              props.item.database.data.length === 1
                ? props.item.borderColor
                : props.item.borderColor[index],
            borderRadius: props.item.borderRadius,
            borderWidth: props.item.borderWidth,
          };
        }),
      });
    }
  }, [props.item]);

  return (
    <div className="card-container">
      <div className="card-title-container">
        <TitleBlock chartId={props.item.chartId} title={props.item.title} />
      </div>
      <div className="card-content">
        <ChartBlock
          type={props.item.type}
          data={chartData}
          options={props.item.options}
        />
      </div>
    </div>
  );
});

export default Card;
