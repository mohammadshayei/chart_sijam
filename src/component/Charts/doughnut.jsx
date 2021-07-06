import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  return (
    <div>
      <Doughnut
        data={props.data}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
              display: true,
              rtl: true,
              position: "left",
            },
          },
          scales: {
            title: {
              display: false,
            },
            x: {
              ticks: { display: false },
              grid: {
                display: false,
                drawBorder: false,
              },
            },
            y: {
              ticks: { display: false },
              grid: {
                display: false,
                drawBorder: false,
              },
              // beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
