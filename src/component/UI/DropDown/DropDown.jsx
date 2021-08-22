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
  // FcScatterPlot,
  FcSettings,
} from "react-icons/fc";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdBubbleChart } from "react-icons/md";
import { stringFa } from "./../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider.js";
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
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setChartType = (chartType) => {
    dispatch(chartActions.setChartType(chartType));
  };

  const handleClick = (value) => {
    setChartType({ key: props.chartId, value, item: "type" });
    props.setDropDown(false); //state of dropdown activate
  };

  return (
    <div
      className="dropdown"
      style={{
        backgroundColor: theme.surface_12dp,
        borderColor: theme.border_color,
      }}
    >
      {chartTypes.map(({ label, value }, index) => (
        <div
          key={label}
          onClick={() => handleClick(value)}
          className="dropdown-item"
          style={{ color: theme.on_background }}
        >
          {label}
          <div className="dropdown-icon">{dropDownIcons[index]}</div>
        </div>
      ))}
      <div
        className="dropdown-divider"
        style={{ borderColor: theme.border_color }}
      ></div>
      <Link
        className="dropdown-item"
        to={{
          pathname: `/create_chart`,
          state: {
            chartId: props.chartId,
          },
        }}
        style={{ textDecoration: "none", color: theme.on_background }}
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
