import React, { useState } from "react";

const SettingsColor = () => {
  const [colors, setColors] = useState({
    0: {
      color: "rgb(3, 127, 76)",
      active: true,
    },
    1: {
      color: "rgb(253, 171, 61)",
      active: false,
    },
    2: {
      color: "rgb(87, 155, 252)",
      active: false,
    },
    3: {
      color: "rgb(226, 68, 92)",
      active: false,
    },
    4: {
      color: "rgb(0, 202, 114)",
      active: false,
    },
    5: {
      color: "rgb(196, 196, 196)",
      active: false,
    },
    6: {
      color: "rgb(0, 134, 192)",
      active: false,
    },
    7: {
      color: "rgb(162, 93, 220)",
      active: false,
    },
    8: {
      color: "rgb(255, 203, 0)",
      active: false,
    },
    9: {
      color: "rgb(51, 51, 51)",
      active: false,
    },
  });

  const onClickHandler = (item) => {
    let updatedColors = { ...colors };
    let clickedItem = item;
    for (const color in updatedColors) {
      updatedColors[color].active = false;
    }
    clickedItem.active = true;
    setColors(updatedColors);
  };

  return (
    <div className="settings-color-component">
      {Object.entries(colors).map(([key, item]) => (
        <a
          key={key}
          className={`settings-color-button ${item.active && "active"}`}
          onClick={() => onClickHandler(item)}
          style={{ background: `${item.color}` }}
        ></a>
      ))}
    </div>
  );
};

export default SettingsColor;
