import React, { useEffect, useState } from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Bar from "../Charts/bar";
import Bubble from "../Charts/bubble";
import Doughnut from "../Charts/doughnut";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import PolarArea from "../Charts/polararea";
import Radar from "../Charts/radar";

function Card(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (
      (props.chartType === "Line" ||
        props.chartType === "Doughnut" ||
        props.chartType === "Pie" ||
        props.chartType === "PolarArea" ||
        props.chartType === "Bar" ||
        props.chartType === "Radar") &&
      props.database
    ) {
      setData({
        labels: props.database.databaseLabels,
        datasets: props.database.databaseData.map((item) => {
        return {
            label: item.dataLabel,
            data: item.data,
            // backgroundColor: item.fillColor,
            borderColor: item.fillColor,
            tension: 0.2,
          };
        }),
      });
    }
  }, [props.chartType, props.database]);

  return (
    <div className="card-container">
      <div className="card-title">
        <SettingsOutlinedIcon
          className="card-setting"
          color="disabled"
          fontSize="small"
        />
        <p>{props.title}</p>
      </div>
      {props.chartType === "Bar" && <Bar data={props.database} />}
      {props.chartType === "Bubble" && <Bubble data={props.database} />}
      {props.chartType === "Doughnut" && <Doughnut data={props.database} />}
      {props.chartType === "Line" && <Line data={data} />}
      {props.chartType === "Pie" && <Pie data={props.database} />}
      {props.chartType === "PolarArea" && <PolarArea data={props.database} />}
      {props.chartType === "Radar" && <Radar data={props.database} />}
    </div>
  );
}

export default Card;
