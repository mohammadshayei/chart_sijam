import React, { useEffect, useState } from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Bar from "../../component/Charts/bar";
import Bubble from "../../component/Charts/bubble";
import Doughnut from "../../component/Charts/doughnut";
import Line from "../../component/Charts/line";
import Pie from "../../component/Charts/pie";
import PolarArea from "../../component/Charts/polararea";
import Radar from "../../component/Charts/radar";
import DropDown from "../../component/UI/DropDown/DropDown";
import { data } from "../../assets/dummy_data/TestData";

const Card = React.memo((props) => {
  const [chartData, setChartData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState(props.chartType);
  const [details, setDetails] = useState([]);
  const chartNames = [
    "Bar",
    "Bubble",
    "Doughnut",
    "Line",
    "Pie",
    "PolarArea",
    "Radar",
  ];

  useEffect(() => {
    if (
      (props.chartType === "Line" ||
        props.chartType === "Doughnut" ||
        props.chartType === "Pie" ||
        props.chartType === "PolarArea" ||
        props.chartType === "Bar" ||
        props.chartType === "Radar") &&
      props.database
    ) {
      setChartData({
        labels: props.database.labels,
        datasets: props.database.data.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            backgroundColor:
              props.database.data.length === 1
                ? props.backGroundColor
                : props.backGroundColor[index],
            borderColor:
              props.database.data.length === 1
                ? props.borderColor
                : props.borderColor[index],
            borderRadius: props.borderRadius,
            borderWidth: props.borderWidth,
          };
        }),
      });
    }
  }, [props]);
  useEffect(() => {
    let tempDetails;
    if (data) {
      data.forEach((item) => {
        if (item.id === props.chartId.substring(0, 3)) {
          tempDetails = [item.name];
          if (item.companies) {
            item.companies.forEach((cp) => {
              if (cp.id === props.chartId.substring(0, 6)) {
                tempDetails = [...tempDetails, cp.name];
                cp.softwares.forEach((sf) => {
                  if (sf.id === props.chartId.substring(0, 9)) {
                    tempDetails = [...tempDetails, sf.name];
                    setDetails(tempDetails);
                  }
                });
              }
            });
          }
        }
      });
    }
  }, [props.chartId]);
  return (
    <div className="card-container">
      {dropDown && (
        <DropDown
          dropDownItems={chartNames}
          selected={selected}
          setSelected={setSelected}
          setDropDown={setDropDown}
        />
      )}
      <div className="card-title-container">
        {/* <div className="card-source-name">
          <p>{details ? details.join(' / ') : ""}</p>
        </div> */}
        <div className="card-title">
          <SettingsOutlinedIcon
            className="card-setting"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
          <p className="details">{details ? details.join(" / ") : ""}</p>
          <p>{props.title}</p>
        </div>
      </div>
      <div className="card-content">
        {selected === "Bar" && <Bar data={chartData} option={props.option} />}
        {selected === "Bubble" && (
          <Bubble data={chartData} option={props.option} />
        )}
        {selected === "Doughnut" && (
          <Doughnut data={chartData} option={props.option} />
        )}
        {selected === "Line" && <Line data={chartData} option={props.option} />}
        {selected === "Pie" && <Pie data={chartData} option={props.option} />}
        {selected === "PolarArea" && (
          <PolarArea data={chartData} option={props.option} />
        )}
        {selected === "Radar" && (
          <Radar data={chartData} option={props.option} />
        )}
      </div>
    </div>
  );
});

export default Card;
