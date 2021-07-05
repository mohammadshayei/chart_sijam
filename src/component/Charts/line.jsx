import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  let datasets = props.data.map((item) => {
    return {
      label: item.label,
      data: item.data,
      backgroundColor: item.fillColor,
    };
  });

  let data = {
    labels: props.labels,
    datasets: datasets,
  };

  return (
    <div>
      <Line
        data={data}
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

export default LineChart;
