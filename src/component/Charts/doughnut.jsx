import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = React.memo((props) => {
  return (
    <div>
      <Doughnut data={props.data} options={props.option} />
    </div>
  );
});

export default DoughnutChart;
