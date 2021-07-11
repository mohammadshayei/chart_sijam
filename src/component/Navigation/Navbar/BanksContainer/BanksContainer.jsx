import React from "react";
import "./BanksContainer.scss";
import { useSelector } from "react-redux";
import Bank from "./Bank/Bank";

const BanksContainer = () => {
  const detail = useSelector((state) => state.detail);
  return (
    <div className="BanksContainer">
      {detail.software
        ? detail.software.banks.map((slide, index) => (
            <Bank key={slide.id} data={slide} />
          ))
        : null}
    </div>
  );
};

export default BanksContainer;
