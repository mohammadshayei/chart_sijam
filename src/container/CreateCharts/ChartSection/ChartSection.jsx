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
      <CardSettingContainer
        type={chartsData.type}
        data={chartsData.data}
        options={chartsData.data.options}
      />
    </div>
  ) : null;
};
export default ChartSection;
