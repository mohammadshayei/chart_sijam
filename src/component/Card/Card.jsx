import React from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { data, labels } from "../../assets/DummyData/data";
import Bar from "../Charts/bar";
import Bubble from "../Charts/bubble";
import Doughnut from "../Charts/doughnut";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import PolarArea from "../Charts/polararea";
import Radar from "../Charts/radar";

function Card({ title, chartType }) {
  return (
    <div className="card-container">
      <div className="card-title">
        <SettingsOutlinedIcon
          className="card-setting"
          color="disabled"
          fontSize="small"
        />
        <p>{title}</p>
      </div>
      {chartType === "Bar" && <Bar data={data} labels={labels} />}
      {chartType === "Bubble" && <Bubble data={data} labels={labels} />}
      {chartType === "Doughnut" && <Doughnut data={data} labels={labels} />}
      {chartType === "Line" && <Line data={data} labels={labels} />}
      {chartType === "Pie" && <Pie data={data} labels={labels} />}
      {chartType === "PolarArea" && <PolarArea data={data} labels={labels} />}
      {chartType === "Radar" && <Radar data={data} labels={labels} />}
    </div>
  );
}

export default Card;
