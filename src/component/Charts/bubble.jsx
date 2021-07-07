import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = (props) => {
  return (
    <div>
      <Bubble
        data={props.data}
        height={300}
        width={300}
        options={props.option}
      />
    </div>
  );
};

export default BubbleChart;
