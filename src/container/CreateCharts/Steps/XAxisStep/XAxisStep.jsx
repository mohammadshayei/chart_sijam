import React, { useState, useEffect, useRef } from "react";
import "./XAxisStep.scss";
import { BiChevronDown } from "react-icons/bi";
import DropDownMenu from "./DropDownMenu/DropDownMenu.jsx";
import { useTheme } from "../../../../styles/ThemeProvider";
import { useSelector } from "react-redux";

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

const XAxisStep = (props) => {
  const chartData = useSelector((state) => state.addChart);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("آیتم سازنده");
  const [dropDownMenuItems, setDropDownMenuItems] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const ref = useRef();

  useEffect(() => {
    let fieldTitles;
    if (chartData.data[0]) {
      fieldTitles = Object.entries(chartData.data[0]).map(([key]) => {
        return key;
      });
      setDropDownMenuItems(fieldTitles);
    }
  }, [chartData.data]);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="settings-content">
      <div className="x-axis-group">
        <div className="settings-field-title-wrapper">
          <div className="settings-field-title">
            <div>نوع ستون</div>
          </div>
        </div>
        <div ref={ref} className="setting-dropdown-component">
          {isOpen && (
            <DropDownMenu
              setIsOpen={setIsOpen}
              selected={selected}
              setSelected={setSelected}
              items={dropDownMenuItems}
            />
          )}
          <div
            className={`dropdown-wrapper ${isOpen && "open"}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{ borderColor: theme.border_color }}
          >
            <div className="dropdown-indicator">
              <div className={`dropdown-indicator-icon ${isOpen && "rotate"}`}>
                <BiChevronDown />
              </div>
            </div>
            <div className="dropdown-title">
              <span className="title-text">{selected}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="x-axis-column"></div>
    </div>
  );
};

export default XAxisStep;
