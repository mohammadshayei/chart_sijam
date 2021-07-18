import React from "react";
import "./CreateCharts.scss";
import SelectImageContainer from "./SelectImageContainer/SelectImageContainer";
import ChartSection from "./ChartSection/ChartSection";
import BankSection from "./BankSection/BankSection";
import SelectBoxDropDown from "../../component/UI/SelectBoxDropDown/SelectBoxDropDown";
const CreateCharts = (props) => {
  return (
    <div className="CreateChartsContainer">
      <SelectImageContainer />
      <div className="RightContainer">
        <SelectBoxDropDown />
        <div className="MainContent">
          <ChartSection />
          <BankSection />
        </div>
        <SelectBoxDropDown />
      </div>
    </div>
  );
};
export default CreateCharts;
