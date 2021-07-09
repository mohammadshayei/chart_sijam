import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = React.memo( (props) => {
  return (
    <div>
      <PolarArea data={props.data} options={props.option} />
    </div>
  );
});

export default PolarAreaChart;
