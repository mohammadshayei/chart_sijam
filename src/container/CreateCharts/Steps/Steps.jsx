import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import XAxisStep from "./XAxisStep/XAxisStep.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import "./Steps.scss";
// import BenchmarkStep from "./BenchmarkStep/BenchmarkStep.jsx";
import { useTheme } from "../../../styles/ThemeProvider";
import TimerStep from "./TimerStep/TimerStep";
import ChartSetting from "./SettingStep/ChartSetting.jsx";
import Filter from "./Filter/Filter.jsx";
import AccessibilityStep from "./AccessibilityStep/AccessibilityStep.jsx";

const Steps = (props) => {
  const [orderSteps, setOrderSteps] = useState({});
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    switch (props.type) {
      case "Column":
      case "Line":
      case "Pie":
        setOrderSteps({
          type: {
            title: "نوع نمودار",
            content: <Gallery type={props.type} />,
            isOpen: true,
          },
          xAxis: {
            title: "انتخاب فیلد",
            content: <XAxisStep />,
            isOpen: false,
          },
          filter: {
            title: "فیلترها",
            content: <Filter />,
            isOpen: false,
          },
          accessibility: {
            title: "دسترسی ها",
            content: <AccessibilityStep />,
            isOpen: false,
          },
          timer: {
            title: "به روزرسانی خودکار",
            content: <TimerStep />,
            isOpen: false,
          },
          // yAxis: {
          //   title: "Y محور",
          //   content: <XAxisStep />,
          //   isOpen: false,
          // },
          // benchmark: {
          //   title: "خطوط معیار",
          //   content: <BenchmarkStep />,
          //   isOpen: false,
          // },
          moreSetting: {
            title: "تنظیمات بیشتر",
            content: <ChartSetting />,
            isOpen: false,
          },
        });
        break;
      default:
        setOrderSteps({});
        break;
    }
  }, [props.type]);

  const onClickHandler = (e, key) => {
    let updatedOrderSteps = { ...orderSteps };
    let clickedStep = updatedOrderSteps[key];
    for (const item in updatedOrderSteps) {
      if (item !== key) updatedOrderSteps[item].isOpen = false;
    }
    clickedStep.isOpen = !clickedStep.isOpen;
    setOrderSteps(updatedOrderSteps);
  };

  return (
    <div className="section-settings-steps-component">
      {Object.entries(orderSteps).map(([k, v]) => {
        return (
          <div
            key={k}
            className={`step-container ${v.isOpen && "open"} container-border`}
            style={{ borderColor: theme.border_color }}
          >
            <div
              className={`step-title-container ${v.isOpen && "open"}`}
              style={{ borderColor: theme.border_color }}
              onClick={(e) => onClickHandler(e, k)}
            >
              <div className="title" style={{ color: theme.text_color }}>
                {v.title}
              </div>
              <div className={`arrow-icon ${v.isOpen && "open"}`}>
                <IoIosArrowDown />
              </div>
            </div>
            <div className="step-setting-fields-container">{v.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
