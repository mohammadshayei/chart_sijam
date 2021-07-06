import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <div>
      <Line
        data={props.data}
        height={300}
        width={300}
        options={{
          tension: 0.2,
          maintainAspectRatio: false,
          scales: {
            y: {
              // position: "right",
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
