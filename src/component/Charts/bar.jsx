import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = React.memo((props) => {
  return (
    <div>
      <Bar data={props.data} options={props.option} />
    </div>
  );
});

export default BarChart;
