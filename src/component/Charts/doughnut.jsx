import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
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
      <Doughnut
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

export default DoughnutChart;
