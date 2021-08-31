import React, { useState, useEffect } from "react";
import "./ChartSection.scss";
import CardSettingContainer from "./CardSettingContainer/CardSettingContainer";
import { useSelector } from "react-redux";

const ChartSection = (props) => {
  // const chartsData = useSelector((state) => state.chart.data[props.chartId]);
  // return chartsData ? (
  //   <div className="ChartSectionContainer">
  //     <CardSettingContainer chartId={props.chartId} chartProps={chartsData} />
  //   </div>
  // ) : (
  // );
  return (
    <div className="ChartSectionContainer">
      <CardSettingContainer />
    </div>
  );
};
export default ChartSection;
