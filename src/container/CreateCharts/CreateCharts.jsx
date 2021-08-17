import React, { useContext, useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import BankSection from "./BankSection/BankSection";
import Steps from "./Steps/Steps";
import { useLocation } from "react-router";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../../component/UI/Button/Button.jsx";
import { VscSplitVertical } from "react-icons/vsc";
import { CgDarkMode } from "react-icons/cg";
import { useTheme } from "../../styles/ThemeProvider.js";

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

const CreateCharts = (props) => {
  const [id, setId] = useState("");
  const [input, setInput] = useState(false);
  const location = useLocation();
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const ref = useRef();

  useEffect(() => {
    const { chartId } = location.state;
    setId(chartId);
  }, [location.state.chartId]);

  useOnClickOutside(ref, () => {
    setInput(false);
  });

  return (
    <div
      className="create-charts-container"
      style={{
        backgroundColor: theme.background_color,
        color: theme.text_color,
      }}
    >
      <div
        className="section-header-wrapper"
        style={{ borderColor: theme.border_color }}
      >
        <Button
          ButtonStyle={{
            backgroundColor: theme.clicked_darken_color,
            flex: "0 0 auto",
            fontWeight: 400,
            fontSize: "1rem",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          {stringFa.done}
        </Button>
        <button
          className="dark-mode-toggle"
          onClick={() => themeState.toggle()}
        >
          <CgDarkMode />
        </button>
        <div className="settings-title-and-description">
          <div className="settings-title" style={{ color: theme.text_color }}>
            {stringFa.chart_setting}
          </div>
          <div
            className="settings-description"
            style={{ color: theme.text_color }}
          >
            {stringFa.chart_setting_description}
          </div>
        </div>
      </div>
      <div className="section-settings-wrapper">
        <div
          className="section-settings"
          style={{ borderColor: theme.border_color }}
        >
          <div
            className="section-settings-header-wrapper"
            style={{ borderColor: theme.border_color }}
          ></div>
          <div className="section-settings-display-type-switcher-wrapper">
            <VscSplitVertical />
          </div>
          <div className="section-settings-content-component">
            <div className="section-settings-content-header-container">
              <div className="base-section-settings-header-component">
                <div
                  className={`base-section-settings-header ${
                    input && "renaming-section"
                  }`}
                >
                  <div
                    className="editable-component"
                    ref={ref}
                    onClick={() => {
                      setInput(true);
                    }}
                  >
                    {input ? (
                      <input
                        className="editable-input"
                        dir="rtl"
                        value="نمودار"
                      />
                    ) : (
                      <div className="text-component" dir="rtl">
                        <span style={{ color: theme.text_color }}>نمودار</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="section-chart-content-container">
              <ChartSection chartId={id} />
            </div>
            <div className="table-component-container">
              <BankSection />
            </div>
          </div>
        </div>
        <Steps type={"Line"} />
      </div>
    </div>
  );
};
export default CreateCharts;
