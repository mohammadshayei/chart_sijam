import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = React.memo((props) => {
  return <Bar data={props.data} options={props.option} />;
});

export default BarChart;
