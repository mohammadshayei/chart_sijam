import React from "react";
import "./DropDown.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setType } from "../../../store/actions/chart.js";
import chartTypes from "../../../constants/chart-types";
import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
} from "react-icons/fc";
import { MdBubbleChart } from "react-icons/md";

const DropDown = (props) => {
  const dropDownIcons = [
    <FcBarChart />,
    <MdBubbleChart />,
    <FcDoughnutChart />,
    <FcLineChart />,
    <FcPieChart />,
    <FcPieChart />,
    <FcRadarPlot />,
  ];

  const handleClick = (value) => {
    setType({ key: props.chartId, value, item: "type" });
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
      <li>
        <Link className="dropdown-item" to={`/create_chart`}>
          ویرایش
        </Link>
      </li>
    </div>
  );
};

export default connect(null, { setType })(DropDown);
