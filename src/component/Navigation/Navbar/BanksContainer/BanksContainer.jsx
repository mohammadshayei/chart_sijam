import React from "react";
import "./BanksContainer.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { lightTheme } from "../../../../styles/theme";

function RightNavButton(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowForwardIosRoundedIcon
        style={{
          color: lightTheme.arrows_color,
          height: "14px",
          width: "14px",
          marginLeft: "1rem",
        }}
      />
    </div>
  );
}
function LeftNavButton(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`slick-arrow`}
      style={{ ...style, display: "flex", alignItems: "center" }}
      onClick={onClick}
    >
      <ArrowBackIosRoundedIcon
        style={{
          color: lightTheme.arrows_color,
          height: "14px",
          width: "14px",
          marginRight: "1rem",
        }}
      />
    </div>
  );
}

const BanksContainer = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <RightNavButton />,
    prevArrow: <LeftNavButton />,
  };
  return (
    <div className="BanksContainer">
      <Slider className="SliderContainer" {...settings}>
        <div className="divstyle">
          <h3>1</h3>
        </div>
        <div className="divstyle">
          <h3>2</h3>
        </div>
        <div className="divstyle">
          <h3>3</h3>
        </div>
        <div className="divstyle">
          <h3>4</h3>
        </div>
      </Slider>
    </div>
  );
};

export default BanksContainer;
