import React, { useState, useEffect, useRef } from "react";
import "./TimerStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import DropDown from "./../../../../component/UI/DropDown/DropDown";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as addChartActions from "../../../../store/actions/addChart";
import { stringFa } from "./../../../../assets/strings/stringFaCollection";

const TimerStep = () => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("دقیقه");
  const [period, setPeriod] = useState(0);
  const [focus, setFocus] = useState(false);
  const [checked, setChecked] = useState(false);
  const [financialGoal, setFinancialGoal] = useState("");
  const [initial, setInitial] = useState(true);
  const takenData = useSelector((state) => state.addChart);
  const dropDownItems = [
    { name: "دقیقه", id: "m" },
    { name: "ساعت", id: "h" },
    { name: "روز", id: "d" },
  ];
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const ref = useRef();

  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };

  const dispatch = useDispatch();
  const setChartTimer = (chartTimer) => {
    dispatch(addChartActions.setChartTimer(chartTimer));
  };

  useEffect(() => {
    if (initial) {
      if (takenData.chartData.config) {
        if (takenData.chartData.config.autoUpdate) {
          setFinancialGoal(takenData.chartData.config.period);
          setChecked(true);
          setInitial(false);
        }
      }
    }
  }, [takenData.chartData]);

  useEffect(() => {
    if (checked) {
      setPeriod(financialGoal);
      setChartTimer({ period, autoUpdate: true });
    } else setChartTimer({ period: 0, autoUpdate: false });
  }, [checked]);

  useEffect(() => {
    if (!initial) {
      setChartTimer({ period, autoUpdate: true });
    }
  }, [period]);

  useEffect(() => {
    for (const item in dropDownItems) {
      if (dropDownItems[item].name === selectedUnit) {
        if (dropDownItems[item].id === "h") setPeriod(period * 60);
        else if (dropDownItems[item].id === "d") setPeriod(period * 1440);
      }
    }
  }, [selectedUnit]);

  const onChangeHandler = (e) => {
    setChartTimer({ period: e.target.value, autoUpdate: true });
    // setTimeout(() => {
    //   if (parseInt(e.target.value) < 10 || e.target.value === "")
    //     setFinancialGoal("10");
    //   for (const item in dropDownItems) {
    //     if (dropDownItems[item].name === selectedUnit) {
    //       if (dropDownItems[item].id === "h") setPeriod(e.target.value * 60);
    //       else if (dropDownItems[item].id === "d")
    //         setPeriod(e.target.value * 1440);
    //       else setPeriod(e.target.value);
    //     }
    //   }
    // }, 2000);
  };

  const handleCheckBoxClick = (checked) => {
    setChecked(checked);
    if (checked) setFinancialGoal("10");
    else setFinancialGoal("");
  };

  const handleInput = (evt) => {
    let financial = financialGoal;
    financial = evt.target.validity.valid ? evt.target.value : financial;
    setFinancialGoal(financial);
  };

  return (
    <div className="timer-step-container">
      <div className="timer-checkbox">
        {stringFa.auto_update}
        <label className="container">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              handleCheckBoxClick(e.target.checked);
            }}
          ></input>
          <span className="checkmark"></span>
        </label>
      </div>
      <div
        className="timer-period"
        style={{
          pointerEvents: checked ? "" : "none",
          opacity: checked ? "1" : "0.4",
        }}
      >
        <div>هر</div>
        <input
          className="input-class"
          style={{
            background: themeState.isDark ? theme.surface_1dp : theme.surface,
            color: theme.on_background,
            borderColor: focus ? theme.primary : theme.border_color,
          }}
          type="text"
          pattern="[0-9]*"
          dir="rtl"
          value={financialGoal}
          onInput={handleInput}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        ></input>
        <div className="setting-dropdown-component" ref={ref}>
          {dropDown && (
            <DropDown
              divStyle={{
                transform: "translateY(1.1rem)",
                maxHeight: "40vh",
                minWidth: "13.5vw",
                overflow: "auto",
                animation: "none",
              }}
              items={dropDownItems}
              setSelected={setSelectedUnit}
              setDropDown={setDropDown}
              divContainerRef={ref}
            />
          )}
          <div
            className={`dropdown-wrapper ${dropDown && "open"}`}
            onClick={() => {
              // setDropDown(!dropDown);
            }}
            style={{ borderColor: theme.border_color, cursor: "default" }}
          >
            {/* <div className="dropdown-indicator">
              <div
                className={`dropdown-indicator-icon ${dropDown && "rotate"}`}
              >
                <BiChevronDown />
              </div>
            </div> */}
            <div className="dropdown-title">
              <span className="title-text">{selectedUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerStep;
