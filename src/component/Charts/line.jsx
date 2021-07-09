import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = React.memo((props) => {
  return (
    <div>
      <Line data={props.data} options={props.option} />
    </div>
  );
});

export default LineChart;
