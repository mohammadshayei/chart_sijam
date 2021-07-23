import React, { useState, useEffect, useRef } from "react";
import "./TitleBlock.scss";

import { data } from "../../assets/dummy_data/TestData";
import { lightTheme } from "../../styles/theme";

import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";

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

  const ref = useRef();

  const onStarClickHandler = (e) => {
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
            {dropDown && <DropDown setDropDown={setDropDown} />}
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

export default TitleBlock;
