import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  return (
    <div>
      <Doughnut
        data={props.data}
        height={200}
        width={200}
        options={props.option}
      />
    </div>
  );
};

export default DoughnutChart;
