import React from "react";
import "./ChartSection.scss";
import ChartSelection from "./ChartSelection/ChartSelection";
import CardSettingContainer from "./CardSettingContainer/CardSettingContainer";
import { useSelector } from "react-redux";

const ChartSection = (props) => {
  const chartsData = useSelector((state) => state.chart.data[props.chartId]);
  return chartsData ? (
    <div className="ChartSectionContainer">
      <ChartSelection />
      <CardSettingContainer chartId={props.chartId} chartProps={chartsData} />
    </div>
  ) : <div>Select Chart</div>;
};
export default ChartSection;
