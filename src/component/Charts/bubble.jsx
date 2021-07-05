import React from "react";
import { Bubble } from "react-chartjs-2";

const BubbleChart = (props) => {
  let datasets = props.data.map((item) => {
    return {
      label: item.label,
      data: item.data, // deffrent data aray needed
      backgroundColor: item.fillColor,
    };
  });

  let data = {
    labels: props.labels,
    datasets: datasets,
  };

  return (
    <div>
      <Bubble
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

export default BubbleChart;
