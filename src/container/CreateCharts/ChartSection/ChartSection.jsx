import React from "react";
import "./ChartSection.scss";
import CardSettingContainer from "./CardSettingContainer/CardSettingContainer";
import { useSelector } from "react-redux";

const ChartSection = (props) => {
  const chartsData = useSelector((state) => state.chart.data[props.chartId]);
  const data = {
    title: "کارایی",
    type: "Line",
    data: [
      {
        category: "فروردین",
        field1: 65,
        field2: 75,
        field3: 35,
        field4: 15,
        field5: 5,
      },
      {
        category: "اردیبهشت",
        field1: 59,
        field2: 40,
        field3: 30,
        field4: 15,
        field5: 8,
      },
      {
        category: "خرداد",
        field1: 80,
        field2: 95,
        field3: 45,
        field4: 20,
        field5: 15,
      },
      {
        category: "تیر",
        field1: 81,
        field2: 103,
        field3: 60,
        field4: 40,
        field5: 10,
      },
      {
        category: "مرداد",
        field1: 56,
        field2: 78,
        field3: 87,
        field4: 25,
        field5: 8,
      },
      {
        category: "شهریور",
        field1: 55,
        field2: 60,
        field3: 20,
        field4: 58,
        field5: 20,
      },
      {
        category: "مهر",
        field1: 40,
        field2: 50,
        field3: 32,
        field4: 40,
        field5: 25,
      },
      {
        category: "آبان",
        field1: 0,
        field2: 0,
        field3: 0,
        field4: 0,
        field5: 0,
      },
      {
        category: "آذر",
        field1: 0,
        field2: 0,
        field3: 0,
        field4: 0,
        field5: 0,
      },
      {
        category: "دی",
        field1: 0,
        field2: 0,
        field3: 0,
        field4: 0,
        field5: 0,
      },
      {
        category: "بهمن",
        field1: 0,
        field2: 0,
        field3: 0,
        field4: 0,
        field5: 0,
      },
      {
        category: "اسفند",
        field1: 0,
        field2: 0,
        field3: 0,
        field4: 0,
        field5: 0,
      },
    ],
    options: {
      fieldNames: {
        field1: "md110",
        field2: "md550",
        field3: "md275",
        field4: "md200",
        field5: "md35",
      },
      legend: { display: true },
      xyCursor: false,
      xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
      series: {
        strokeWidth: 2,
        smoothing: "monotoneX",
        bullet: {
          display: true,
          strokeColor: "#fff",
          strokeWidth: 0,
        },
      },
    },
  };
  return chartsData ? (
    <div className="ChartSectionContainer">
      <CardSettingContainer chartId={props.chartId} chartProps={chartsData} />
    </div>
  ) : (
    <div className="ChartSectionContainer">
      <CardSettingContainer chartId={"001001001333002"} chartProps={data} />
    </div>
  );
};
export default ChartSection;
