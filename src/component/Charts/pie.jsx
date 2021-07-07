import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <div>
      <Pie data={props.data} height={300} width={300} options={props.option} />
    </div>
  );
};

export default PieChart;
