import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <div>
      <Pie
        data={props.data}
        height={300}
        width={300}
        options={{
          responsive: true,
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

export default PieChart;
