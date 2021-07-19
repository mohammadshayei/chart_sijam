import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { data } from "../../assets/dummy_data/TestData";
import { lightTheme } from "../../styles/theme";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
} from "react-icons/fc";
import { MdBubbleChart } from "react-icons/md";

import DropDown from "./../UI/DropDown/DropDown";

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
    <div className="title-container">
      <div className="card-source-name">
        <div className="setting-container">
          <div ref={ref}>
            {dropDown && (
              <DropDown
                dropDownItems={dropDownItems}
                dropDownIcons={dropDownIcons}
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
  );
});

TitleBlock.propTypes = {};

export default TitleBlock;
