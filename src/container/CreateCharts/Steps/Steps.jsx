import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import XAxisStep from "./XAxisStep/XAxisStep.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import "./Steps.scss";
import BenchmarkStep from "./BenchmarkStep/BenchmarkStep.jsx";
import { useTheme } from "../../../styles/ThemeProvider";
import TimerStep from "./TimerStep/TimerStep";

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
            isOpen: false,
          },
          xAxis: {
            title: "انتخاب فیلد",
            content: <XAxisStep />,
            isOpen: true,
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
          // moreSetting: {
          //   title: "تنظیمات بیشتر",
          //   content: "test2",
          //   isOpen: false,
          // },
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
