import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = React.memo((props) => {
  return (
    <div>
      <Pie data={props.data} options={props.option} />
    </div>
  );
});

export default PieChart;
