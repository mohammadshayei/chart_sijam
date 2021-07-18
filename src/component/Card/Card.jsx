import React, { useEffect, useState, useRef } from "react";
import "./Card.scss";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import BarChart from "./../Charts/bar";
import BubbleChart from "./../Charts/bubble";
import DoughnutChart from "./../Charts/doughnut";
import LineChart from "./../Charts/line";
import PieChart from "./../Charts/pie";
import PolarAreaChart from "./../Charts/polararea";
import RadarChart from "./../Charts/radar";
import DropDown from "./../UI/DropDown/DropDown";
import { data } from "../../assets/dummy_data/TestData";
import { lightTheme } from "../../styles/theme";
import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
} from "react-icons/fc";
import { MdBubbleChart } from "react-icons/md";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const Card = React.memo((props) => {
  const [chartData, setChartData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const starStyles = {
    color: lightTheme.star_color,
  };
  const dropDownItems = [
    "ستونی",
    "حبابی",
    "دونات",
    "خطی",
    "دایره ای",
    "مساحت",
    "راداری",
    "divider",
    "کوچک",
    "متوسط",
    "بزرگ",
  ];
  const dropDownIcons = [
    <FcBarChart />,
    <MdBubbleChart />,
    <FcDoughnutChart />,
    <FcLineChart />,
    <FcPieChart />,
    <FcPieChart />,
    <FcRadarPlot />,
  ];
  const ref = useRef();

  const onStarClickHandler = (e) => {
    // ripple(e, 'red');
    setIsFav(!isFav);
  };

  useOnClickOutside(ref, () => {
    setDropDown(false);
  });

  useEffect(() => {
    if (props.chartType === "Bar") {
      setSelected("ستونی");
    }
    if (props.chartType === "Bubble") {
      setSelected("حبابی");
    }
    if (props.chartType === "Doughnut") {
      setSelected("دونات");
    }
    if (props.chartType === "Line") {
      setSelected("خطی");
    }
    if (props.chartType === "Pie") {
      setSelected("دایره ای");
    }
    if (props.chartType === "PolarArea") {
      setSelected("مساحت");
    }
    if (props.chartType === "Radar") {
      setSelected("راداری");
    }
  }, [props.chartType]);

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
      <div className="card-title-container">
        <div className="card-source-name">
          <div className="setting-container">
            <div ref={ref}>
              {dropDown && (
                <DropDown
                  dropDownItems={dropDownItems}
                  dropDownIcons={dropDownIcons}
                  selected={selected}
                  setSelected={setSelected}
                  setDropDown={setDropDown}
                />
              )}
              <SettingsOutlinedIcon
                className="card-setting"
                onClick={() => {
                  setDropDown(!dropDown);
                }}
              />
            </div>
          </div>
          <p className="details">{details ? details.join(" / ") : ""}</p>
          <div className="star-container" onClick={onStarClickHandler}>
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
        {selected === "ستونی" && (
          <BarChart data={chartData} option={props.option} />
        )}
        {selected === "حبابی" && (
          <BubbleChart data={chartData} option={props.option} />
        )}
        {selected === "دونات" && (
          <DoughnutChart data={chartData} option={props.option} />
        )}
        {selected === "خطی" && (
          <LineChart data={chartData} option={props.option} />
        )}
        {selected === "دایره ای" && (
          <PieChart data={chartData} option={props.option} />
        )}
        {selected === "مساحت" && (
          <PolarAreaChart data={chartData} option={props.option} />
        )}
        {selected === "راداری" && (
          <RadarChart data={chartData} option={props.option} />
        )}
      </div>
    </div>
  );
});

export default Card;
