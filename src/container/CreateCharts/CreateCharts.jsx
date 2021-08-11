import React, { useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import BankSection from "./BankSection/BankSection";
import { useLocation } from "react-router";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../../component/UI/Button/Button.jsx";
import { lightTheme } from "./../../styles/theme";
import { VscSplitVertical } from "react-icons/vsc";
import DropBox from "./../../component/DropBox/DropBox";

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

  const ref = useRef();

  useEffect(() => {
    const { chartId } = location.state;
    setId(chartId);
  }, [location.state.chartId]);

  useOnClickOutside(ref, () => {
    setInput(false);
  });

  return (
    <div className="create-charts-container">
      <div className="section-header-wrapper">
        <Button
          ButtonStyle={{
            backgroundColor: lightTheme.clicked_darken_color,
            flex: "0 0 auto",
            fontWeight: 400,
            fontSize: "1rem",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          {stringFa.done}
        </Button>
        <div className="settings-title-and-description">
          <div className="settings-title">{stringFa.chart_setting}</div>
          <div className="settings-description">
            {stringFa.chart_setting_description}
          </div>
        </div>
      </div>
      <div className="section-settings-wrapper">
        <div className="section-settings">
          <div className="section-settings-header-wrapper"></div>
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
                        <span>نمودار</span>
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
        <div className="section-settings-steps-component">
          <DropBox isOpen={true} title={"نوع نمودار"}>
            نوع نمودار
          </DropBox>
          <DropBox isOpen={false} title={"X محور"}>
            محورX
          </DropBox>
          <DropBox isOpen={false} title={"Y محور"}>
            محورY
          </DropBox>
        </div>
      </div>
    </div>
  );
};
export default CreateCharts;
