import React from "react";
import "./DropDown.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as chartActions from "../../../store/actions/chart.js";
import { chartTypes } from "../../../constants/chart-types";
import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
  FcScatterPlot,
  FcSettings,
} from "react-icons/fc";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdBubbleChart } from "react-icons/md";
import { stringFa } from "./../../../assets/strings/stringFaCollection";
// import { EditRoundedIcon } from "@material-ui/icons/EditRounded";

const DropDown = (props) => {
  const dropDownIcons = [
    <FcBarChart />,
    <MdBubbleChart />,
    <FcDoughnutChart />,
    <FcLineChart />,
    <FcPieChart />,
    <FcPieChart />,
    <FcRadarPlot />,
    <IoSpeedometerOutline />,
    <FcSettings />,
  ];

  const dispatch = useDispatch();
  const setChartType = (chartType) => {
    dispatch(chartActions.setChartType(chartType));
  };

  const handleClick = (value) => {
    setChartType({ key: props.chartId, value, item: "type" });
    props.setDropDown(false); //state of dropdown activate
  };

  return (
    <div className="dropdown">
      {chartTypes.map(({ label, value }, index) => (
        <div
          key={`${value}`}
          onClick={() => handleClick(value)}
          className="dropdown-item"
        >
          {label}
          <div className="dropdown-icon">{dropDownIcons[index]}</div>
        </div>
      ))}
      <div className="dropdown-divider"></div>
      <Link
        className="dropdown-item"
        to={{
          pathname: `/create_chart`,
          state: {
            chartId: props.chartId,
          },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        {stringFa.Edit}
        <div className="dropdown-icon">
          {dropDownIcons[dropDownIcons.length - 1]}
        </div>
      </Link>
    </div>
  );
};

export default DropDown;
