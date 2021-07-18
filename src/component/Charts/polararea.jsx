import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = React.memo((props) => {
  return <PolarArea data={props.data} options={props.option} />;
});

export default PolarAreaChart;
