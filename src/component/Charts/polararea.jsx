import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";

const PolarAreaChart = (props) => {
  const [datasets, setDataSets] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.data) {
      setDataSets(
        props.data.map((item) => {
          return {
            label: item.label,
            data: item.data,
            // backgroundColor: item.fillColor,
            borderColor: item.fillColor,
            tension: 0.2,
          };
        })
      );

      setData({
        labels: props.labels,
        datasets: datasets,
      });
    }
  }, [props.data]);

  return (
    <div>
      <PolarArea
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

export default PolarAreaChart;
