import React from "react";
import "./BanksContainer.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AcUnitIcon from '@material-ui/icons/AcUnit';
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      <AcUnitIcon  />
    </button>
  );
}

const BanksContainer = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
