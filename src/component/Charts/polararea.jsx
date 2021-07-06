import React from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = (props) => {  
  return (
    <div>
      <PolarArea
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

export default PolarAreaChart;
