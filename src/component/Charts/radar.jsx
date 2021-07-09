import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = React.memo( (props) => {
  return (
    <div>
      <Radar data={props.data} options={props.option} />
    </div>
  );
});

export default RadarChart;
