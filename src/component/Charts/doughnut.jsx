import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = React.memo((props) => {
  return <Doughnut data={props.data} options={props.option} />;
});

export default DoughnutChart;
