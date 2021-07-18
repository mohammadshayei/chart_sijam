import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = React.memo((props) => {
  return <Bubble data={props.data} options={props.option} />;
});

export default BubbleChart;
