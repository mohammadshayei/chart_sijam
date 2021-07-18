import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = React.memo((props) => {
  return <Line data={props.data} options={props.option} />;
});

export default LineChart;
