import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = React.memo( (props) => {
  return (
    <div>
      <Bubble data={props.data} options={props.option} />
    </div>
  );
});

export default BubbleChart;
