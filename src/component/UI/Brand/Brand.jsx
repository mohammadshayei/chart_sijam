import React from "react";
import { Link } from "react-router-dom";
import "./Brand.scss";
const Brand = (props) => {
  return (
    <Link
      to={{
        pathname: "/view",
      }}
      style={{ textDecoration: "none" }}
      className="brand-container"
      onClick={props.onClick}
    >
      <span style={{ color: "#A49BFF" }}>{props.brandName}</span>
      <img src={props.brandImage} alt="brand image" />
    </Link>
  );
};

export default Brand;
