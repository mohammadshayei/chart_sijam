import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CardSettingContainer.scss";
// import { lightTheme } from "../../../../styles/theme";
import ChartBlock from "./../../../../component/ChartBlock";
import * as chartActions from "../../../../store/actions/chart.js";

const CardSettingContainer = (props) => {
  const dispatch = useDispatch();
  const setChartOptions = (chartOptions) => {
    dispatch(
      chartActions.setChartOptions({ chartId: props.chartId, chartOptions })
    );
  };
  return (
    <div className="ChartShowContainer">
      <ChartBlock chartId="123456789" />
    </div>
  );
};

export default CardSettingContainer;
