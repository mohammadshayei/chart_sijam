import React, { useState, useEffect, useRef } from "react";
import "./TitleBlock.scss";
import { data } from "../../assets/dummy_data/TestData";
import { useTheme } from "../../styles/ThemeProvider";
import * as chartActions from "../../store/actions/chart.js";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import DropDown from "./../UI/DropDown/DropDown";
import { Link } from "react-router-dom";
import { stringFa } from "./../../assets/strings/stringFaCollection";
import { chartTypes } from "../../constants/chart-types";
import { useDispatch } from "react-redux";
import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
  // FcScatterPlot,
  FcSettings,
} from "react-icons/fc";
import { IoSpeedometerOutline } from "react-icons/io5";
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

const TitleBlock = React.memo((props) => {
  const [dropDown, setDropDown] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [selected, setSelected] = useState(props.chartType);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const starStyles = {
    color: theme.star_color,
  };
  const dropDownIcons = [
    <FcBarChart />,
    <MdBubbleChart />,
    <FcDoughnutChart />,
    <FcLineChart />,
    <FcPieChart />,
    <FcPieChart />,
    <FcRadarPlot />,
    <IoSpeedometerOutline />,
    <FcSettings />,
  ];
  const types = chartTypes.map(({ label }) => label);
  const extraItem = (
    <div>
      <div
        className="dropdown-divider"
        style={{ borderColor: theme.border_color }}
      ></div>
      <Link
        className="dropdown-item"
        to={{
          pathname: `/create_chart`,
          state: {
            chartId: props.chartId,
          },
        }}
        style={{ textDecoration: "none", color: theme.on_background }}
      >
        {stringFa.Edit}
        {/* {props.icons && (
          <div className="dropdown-icon">
            {props.icons[props.icons.length - 1]}
          </div>
        )} */}
      </Link>
    </div>
  );

  const ref = useRef();

  const onStarClickHandler = (e) => {
    setIsFav(!isFav);
  };
  useOnClickOutside(ref, () => {
    setDropDown(false);
  });

  const dispatch = useDispatch();
  const setChartType = (chartType) => {
    dispatch(chartActions.setChartType(chartType));
  };

  useEffect(() => {
    let value;
    chartTypes.forEach((element) => {
      if (selected === element.label) {
        value = element.value;
      } else {
        value = selected;
      }
    });
    setChartType({ key: props.chartId, value, item: "type" });
  }, [selected]);

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
    <div className="title-container" style={{ color: theme.on_surface }}>
      <div className="card-source-name">
        <div className="setting-container">
          <div ref={ref}>
            {dropDown && (
              <DropDown
                items={types}
                extraItem={extraItem}
                icons={dropDownIcons}
                setSelected={setSelected}
                setDropDown={setDropDown}
              />
            )}
            <SettingsOutlinedIcon
              className={`card-setting ${
                !dropDown && `card-setting-animation`
              }`}
              onClick={() => {
                setDropDown(!dropDown);
              }}
              style={{ color: theme.on_surface }}
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
  );
});

export default TitleBlock;
