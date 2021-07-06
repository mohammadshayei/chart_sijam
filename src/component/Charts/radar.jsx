import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = (props) => {
  return (
    <div>
      <Radar
        data={props.data}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RadarChart;
