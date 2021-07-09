import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  return (
    <div>
      <Bar data={props.data} height={200} width={200} options={props.option} />
    </div>
  );
};

export default BarChart;
