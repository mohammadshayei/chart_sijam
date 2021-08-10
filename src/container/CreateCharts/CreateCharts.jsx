import React, { useState, useEffect } from "react";
import "./CreateCharts.scss";
import SelectImageContainer from "./SelectImageContainer/SelectImageContainer";
import ChartSection from "./ChartSection/ChartSection";
import BankSection from "./BankSection/BankSection";
import SelectBoxDropDown from "../../component/UI/SelectBoxDropDown/SelectBoxDropDown";
import { useLocation } from "react-router";

const CreateCharts = (props) => {
  const [id, setId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const { chartId } = location.state;
    setId(chartId);
  }, [location.state.chartId]);

  return (
    <div className="CreateChartsContainer">
      <SelectImageContainer />
      <div className="RightContainer">
        <SelectBoxDropDown />
        <div className="MainContent">
          <ChartSection chartId={id} />
          <BankSection />
        </div>
        <SelectBoxDropDown />
      </div>
    </div>
  );
};
export default CreateCharts;
