import React, { useEffect, useState } from "react";
import "./Card.scss";

import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";

const Card = React.memo((props) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (
      (props.item.type === "Line" ||
        props.item.type === "Doughnut" ||
        props.item.type === "Pie" ||
        props.item.type === "PolarArea" ||
        props.item.type === "Bar" ||
        props.item.type === "Radar") &&
      props.item.data.database
    ) {
      setChartData({
        labels: props.item.data.database.labels,
        datasets: props.item.data.database.data.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            backgroundColor:
              props.item.data.database.data.length === 1
                ? props.item.data.backGroundColor
                : props.item.data.backGroundColor[index],
            borderColor:
              props.item.data.database.data.length === 1
                ? props.item.data.borderColor
                : props.item.data.borderColor[index],
            borderRadius: props.item.data.borderRadius,
            borderWidth: props.item.data.borderWidth,
          };
        }),
      });
    }
  }, [props.item]);

  return (
    <div key={props.key} className="card">
      <TitleBlock chartId={props.item.data.id} title={props.item.title} />
      <div className="card-body">
        <ChartBlock
          type={props.item.type}
          data={chartData}
          options={props.item.data.options}
        />
      </div>
    </div>
  );
});

export default Card;
