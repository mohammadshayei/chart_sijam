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

const Card = React.memo(function Card(props) {
  const [data, setData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const chartNames = [
    "ستونی",
    "حبابی",
    "دونات",
    "خطی",
    "دایره ای",
    "قطبی",
    "راداری",
  ];

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
        labels: props.database.labels,
        datasets: props.database.data.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            backgroundColor:
              props.database.data.length === 1
                ? props.backGroundColor
                : props.backGroundColor[index],
            borderColor:
              props.database.data.length === 1
                ? props.borderColor
                : props.borderColor[index],
            borderRadius: props.borderRadius,
            borderWidth: props.borderWidth,
          };
        }),
      });
    }
  }, [props]);

  return (
    <div className="card-container">
      <div className="card-title">
        <SettingsOutlinedIcon
          className="card-setting"
          onClick={() => {
            setDropDown(!dropDown);
          }}
        />
        <p>{props.title}</p>
      </div>
      <div className="card-content">

      </div>
      {dropDown && (
        <div className="card-dropdown">
          {chartNames.map((item) => 
            <div className="card-dropdown-item">{item}</div>
          )}
        </div>
      )}
      {props.chartType === "Bar" && <Bar data={data} option={props.option} />}
      {props.chartType === "Bubble" && (
        <Bubble data={data} option={props.option} />
      )}
      {props.chartType === "Doughnut" && (
        <Doughnut data={data} option={props.option} />
      )}
      {props.chartType === "Line" && <Line data={data} option={props.option} />}
      {props.chartType === "Pie" && <Pie data={data} option={props.option} />}
      {props.chartType === "PolarArea" && (
        <PolarArea data={data} option={props.option} />
      )}
      {props.chartType === "Radar" && (
        <Radar data={data} option={props.option} />
      )}
    </div>
  );
});

export default Card;
