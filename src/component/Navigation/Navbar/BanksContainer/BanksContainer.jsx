import React from "react";
import "./BanksContainer.scss";
import { useSelector } from "react-redux";
import Bank from "./Bank/Bank";

const BanksContainer = () => {
  const software = useSelector((state) => state.software);
  return (
    <div className="BanksContainer">
      {software.banks.map((slide, index) => (
        <Bank key={slide.id} data={slide}  />
      ))}
    </div>
  );
};

export default BanksContainer;
