import React, { useEffect, useState } from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Bar from "../Charts/bar";
import Bubble from "../Charts/bubble";
import Doughnut from "../Charts/doughnut";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import PolarArea from "../Charts/polararea";
import Radar from "../Charts/radar";
import DropDown from "../UI/DropDown/DropDown";
import { data } from "../../assets/dummy_data/TestData";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { lightTheme } from "../../styles/theme";
const Card = React.memo((props) => {
  const [chartData, setChartData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState(props.chartType);
  const [details, setDetails] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const onStarClickHandler = (e) => {
    // ripple(e, 'red');
    setIsFav(!isFav);
  };

  const starStyles = {
    color: lightTheme.star_color,
  };
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
        <div className="card-source-name">
          <SettingsOutlinedIcon
            className="card-setting"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
          <p className="details">{details ? details.join(" / ") : ""}</p>
          <div className='star-container' onClick={onStarClickHandler}>
            {isFav ? (
              <StarRoundedIcon style={starStyles} />
            ) : (
              <StarBorderRoundedIcon style={starStyles} />
            )}
          </div>
        </div>
        <div className="card-title">
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
