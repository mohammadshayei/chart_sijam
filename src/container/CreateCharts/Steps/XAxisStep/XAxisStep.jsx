import React, { useState, useEffect } from "react";
import "./XAxisStep.scss";
import { BiChevronDown } from "react-icons/bi";
import DropDownMenu from "./DropDownMenu/DropDownMenu.jsx";
import DropDown from "../../../../component/UI/DropDown/DropDown";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import * as addChartActions from "../../../../store/actions/addChart";
import { useSelector, useDispatch } from "react-redux";

const XAxisStep = (props) => {
  const takenData = useSelector((state) => state.addChart);
  const [dropDownContent, setDropDownContent] = useState({
    categories: { menuItems: [], isOpen: false, selected: "" },
    values: { menuItems: [], isOpen: false, selected: "" },
  });
  const [initial, setInitial] = useState(true);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };

  useEffect(() => {
    if (initial) {
      if (takenData.data.fieldsType) {
        let updatedDropDown = { ...dropDownContent };
        let firstCategory = true,
          firstValue = true;
        for (const title in takenData.data.fieldsType) {
          for (const key in takenData.data.fieldsType[title]) {
            if (
              firstCategory &&
              takenData.data.fieldsType[title][key] === "عبارت‌"
            ) {
              updatedDropDown.categories.selected = key;
              firstCategory = false;
            }
            updatedDropDown.categories.menuItems = [
              ...updatedDropDown.categories.menuItems,
              { name: key, id: title },
            ];
            if (takenData.data.fieldsType[title][key] === "عدد") {
              if (firstValue) {
                updatedDropDown.values.selected = key;
                firstValue = false;
              }
              updatedDropDown.values.menuItems = [
                ...updatedDropDown.values.menuItems,
                { name: key, id: title },
              ];
            }
          }
        }
        setDropDownContent(updatedDropDown);
        setInitial(false);
      }
    }
    if (takenData.data.data) {
      let chartData = { ...takenData.chartData };
      let fieldCategories = [],
        fieldValues = [];
      Object.entries(takenData.data.data).map(([key, value]) => {
        Object.entries(value).map(([k, v]) => {
          if (k === dropDownContent.values.selected) {
            fieldValues = [...fieldValues, v];
          }
          if (k === dropDownContent.categories.selected) {
            fieldCategories = [...fieldCategories, v];
          }
        });
      });
      if (dropDownContent.categories.selected !== "") {
        if (!chartData.data.isCategoryAdded) {
          if (chartData.data.valueCount === 0) {
            for (let index = 0; index < fieldCategories.length; index++) {
              chartData = {
                ...chartData,
                data: {
                  ...chartData.data,
                  data: [
                    ...chartData.data.data,
                    {
                      ...chartData.data.data[index],
                      category: fieldCategories[index],
                    },
                  ],
                },
              };
            }
          } else
            for (let index = 0; index < fieldCategories.length; index++) {
              chartData.data.data[index] = {
                ...chartData.data.data[index],
                category: fieldCategories[index],
              };
            }
          chartData.data.isCategoryAdded = true;
        } else
          for (let index = 0; index < fieldCategories.length; index++) {
            chartData.data.data[index].category = fieldCategories[index];
          }
      }
      if (dropDownContent.values.selected !== "") {
        if (!chartData.data.isCategoryAdded) {
          for (let index = 0; index < fieldValues.length; index++) {
            chartData = {
              ...chartData,
              data: {
                ...chartData.data,
                data: [
                  ...chartData.data.data,
                  {
                    ...chartData.data.data[index],
                    field1: fieldValues[index],
                  },
                ],
              },
            };
          }
        } else {
          for (let index = 0; index < fieldValues.length; index++) {
            chartData.data.data[index].field1 = fieldValues[index];
          }
        }
        chartData.data.valueCount = 1;
      }
      setChartData(chartData);
    }
  }, [
    takenData.data,
    dropDownContent.categories.selected,
    dropDownContent.values.selected,
  ]);

  const setCategoryIsOpen = (value) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.categories.isOpen = value;
    setDropDownContent(updatedDropDown);
  };

  const setSelectedCategory = (value) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.categories.selected = value;
    setDropDownContent(updatedDropDown);
  };

  const setValueIsOpen = (value) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.values.isOpen = value;
    setDropDownContent(updatedDropDown);
  };

  const setSelectedValue = (value) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.values.selected = value;
    setDropDownContent(updatedDropDown);
  };

  const categoryClickHandler = (open) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.categories.isOpen = !open;
    setDropDownContent(updatedDropDown);
  };

  const valueClickHandler = (open) => {
    let updatedDropDown = { ...dropDownContent };
    updatedDropDown.values.isOpen = !open;
    setDropDownContent(updatedDropDown);
  };

  return (
    <div className="settings-content">
      <div className="x-axis-group">
        <div className="settings-field-title-wrapper">
          <div className="settings-field-title">
            <div>{stringFa.column_type}</div>
          </div>
        </div>
        <div className="setting-dropdown-component">
          {dropDownContent.categories.isOpen && (
            <DropDown
              divStyle={{
                transform: "translateY(1.1rem)",
                maxHeight: "40vh",
                minWidth: "23.5vw",
                overflow: "auto",
                animation: "none",
              }}
              items={dropDownContent.categories.menuItems}
              setSelected={setSelectedCategory}
              setDropDown={setCategoryIsOpen}
            />
          )}
          <div
            className={`dropdown-wrapper ${
              dropDownContent.categories.isOpen && "open"
            }`}
            onClick={() =>
              categoryClickHandler(dropDownContent.categories.isOpen)
            }
            style={{ borderColor: theme.border_color }}
          >
            <div className="dropdown-indicator">
              <div
                className={`dropdown-indicator-icon ${
                  dropDownContent.categories.isOpen && "rotate"
                }`}
              >
                <BiChevronDown />
              </div>
            </div>
            <div className="dropdown-title">
              <span className="title-text">
                {dropDownContent.categories.selected}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="x-axis-group">
        <div className="settings-field-title-wrapper">
          <div className="settings-field-title">
            <div>{stringFa.values}</div>
          </div>
        </div>
        <div className="setting-dropdown-component">
          {dropDownContent.values.isOpen && (
            <DropDown
              divStyle={{
                transform: "translateY(1.1rem)",
                maxHeight: "40vh",
                minWidth: "23.5vw",
                overflow: "auto",
                animation: "none",
              }}
              items={dropDownContent.values.menuItems}
              setSelected={setSelectedValue}
              setDropDown={setValueIsOpen}
            />
          )}
          <div
            className={`dropdown-wrapper ${
              dropDownContent.values.isOpen && "open"
            }`}
            onClick={() => valueClickHandler(dropDownContent.values.isOpen)}
            style={{ borderColor: theme.border_color }}
          >
            <div className="dropdown-indicator">
              <div
                className={`dropdown-indicator-icon ${
                  dropDownContent.values.isOpen && "rotate"
                }`}
              >
                <BiChevronDown />
              </div>
            </div>
            <div className="dropdown-title">
              <span className="title-text">
                {dropDownContent.values.selected}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="x-axis-column"></div>
    </div>
  );
};

export default XAxisStep;
