import React, { useEffect, useState, useCallback } from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Bar from "../Charts/bar";
import Bubble from "../Charts/bubble";
import Doughnut from "../Charts/doughnut";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import PolarArea from "../Charts/polararea";
import Radar from "../Charts/radar";
import DropDown from "../UI/DropDown/DropDown";

const Card = React.memo((props) => {
  const [data, setData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState(props.chartType);

  const chartNames = [
    "Bar",
    "Bubble",
    "Doughnut",
    "Line",
    "Pie",
    "PolarArea",
    "Radar",
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
      {dropDown && (
        <DropDown
          dropDownItems={chartNames}
          selected={selected}
          setSelected={setSelected}
          setDropDown={setDropDown}
        />
      )}
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
        {selected === "Bar" && <Bar data={data} option={props.option} />}
        {selected === "Bubble" && <Bubble data={data} option={props.option} />}
        {selected === "Doughnut" && (
          <Doughnut data={data} option={props.option} />
        )}
        {selected === "Line" && <Line data={data} option={props.option} />}
        {selected === "Pie" && <Pie data={data} option={props.option} />}
        {selected === "PolarArea" && (
          <PolarArea data={data} option={props.option} />
        )}
        {selected === "Radar" && <Radar data={data} option={props.option} />}
      </div>
    </div>
  );
});

export default Card;
