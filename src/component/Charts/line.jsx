import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <div>
      <Line
        data={props.data}
        height={300}
        width={300}
        options={props.option}
      />
    </div>
  );
};

export default LineChart;
