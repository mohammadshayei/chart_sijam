import React from "react";
import "./CreateCharts.scss";
import SelectImageContainer from "./SelectImageContainer/SelectImageContainer";
import ChartSection from "./ChartSection/ChartSection";
import BankSection from "./BankSection/BankSection";
import SelectBoxDropDown from "../../component/UI/SelectBoxDropDown/SelectBoxDropDown";
import { useLocation } from "react-router";

const CreateCharts = (props) => {
  const location = useLocation();
  const { chartId } = location.state;
  return (
    <div className="CreateChartsContainer">
      <SelectImageContainer />
      <div className="RightContainer">
        <SelectBoxDropDown />
        <div className="MainContent">
          <ChartSection chartId={chartId} />
          <BankSection />
        </div>
        <SelectBoxDropDown />
      </div>
    </div>
  );
};
export default CreateCharts;
