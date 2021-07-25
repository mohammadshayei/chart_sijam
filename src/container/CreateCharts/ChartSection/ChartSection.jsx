import React from "react";
import "./ChartSection.scss";
import ChartSelection from "./ChartSelection/ChartSelection";
import CardSettingContainer from "./CardSettingContainer/CardSettingContainer";
const ChartSection = (props) => {
  const data = {
    labels: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    datasets: [
      {
        label: "110",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "550",
        data: [75, 40, 95, 103, 78, 60, 50],
        backgroundColor: "rgba(255, 165, 80, 1)",
        borderColor: "rgba(255, 165, 80, 1)",
      },
      {
        label: "275",
        data: [35, 30, 45, 60, 87, 20, 32],
        backgroundColor: "rgba(234, 96, 97, 1)",
        borderColor: "rgba(234, 96, 97, 1)",
      },
      {
        label: "200",
        data: [15, 15, 20, 40, 25, 58, 40],
        backgroundColor: "rgba(0, 136, 132, 1)",
        borderColor: "rgba(0, 136, 132, 1)",
      },
      {
        label: "35",
        data: [5, 8, 15, 10, 8, 20, 25],
        backgroundColor: "rgba(152, 148, 215, 1)",
        borderColor: "rgba(152, 148, 215, 1)",
      },
    ],
  };
  const options = {
    tension: 0.2,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { usePointStyle: true },
        display: true,
        rtl: false,
        position: "top",
      },
    },
    scales: { y: { beginAtZero: false } },
    responsive: true,
  };
  return (
    <div className="ChartSectionContainer">
      <ChartSelection />
      <CardSettingContainer data={data} options={options}/>
    </div>
  );
};
export default ChartSection;
