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
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };

  useEffect(() => {
    let updatedDropDown = { ...dropDownContent };
    if (takenData.data[0]) {
      const fieldTitles = Object.entries(takenData.data[0]).map(([key]) => {
        return key;
      });
      for (let index = 1; index <= fieldTitles.length; index++) {
        updatedDropDown.categories.menuItems = [
          ...updatedDropDown.categories.menuItems,
          { name: fieldTitles[index], id: index },
        ];
        updatedDropDown.values.menuItems = [
          ...updatedDropDown.values.menuItems,
          { name: fieldTitles[index], id: index },
        ];
      }
      setDropDownContent(updatedDropDown);
    }
  }, [takenData.data]);

  useEffect(() => {
    if (takenData.data && dropDownContent.categories.selected !== "") {
      let chartData = { ...takenData.chartData };
      let fieldValues = [];
      Object.entries(takenData.data).map(([key, value]) => {
        Object.entries(value).map(([k, v]) => {
          if (k === dropDownContent.categories.selected) {
            fieldValues = [...fieldValues, v];
          }
        });
      });
      if (!takenData.chartData.data.isCategoryAdded) {
        switch (takenData.chartData.data.valueCount) {
          case 0:
            for (let index = 0; index < fieldValues.length; index++) {
              chartData = {
                ...chartData,
                data: {
                  ...chartData.data,
                  data: [
                    ...chartData.data.data,
                    {
                      ...chartData.data.data[index],
                      category: fieldValues[index],
                    },
                  ],
                },
              };
            }
            break;
          case 1:
            for (let index = 0; index < fieldValues.length; index++) {
              chartData.data.data[index] = {
                ...chartData.data.data[index],
                category: fieldValues[index],
              };
            }
          default:
            break;
        }
        chartData.data.isCategoryAdded = true;
      } else
        for (let index = 0; index < fieldValues.length; index++) {
          chartData.data.data[index].category = fieldValues[index];
        }
      setChartData(chartData);
    }
  }, [dropDownContent.categories.selected]);

  useEffect(() => {
    if (takenData.data && dropDownContent.values.selected !== "") {
      let chartData = { ...takenData.chartData };
      let fieldValues = [];
      Object.entries(takenData.data).map(([key, value]) => {
        Object.entries(value).map(([k, v]) => {
          if (k === dropDownContent.values.selected) {
            fieldValues = [...fieldValues, v];
          }
        });
      });
      console.log(takenData.chartData.data.isCategoryAdded);
      switch (takenData.chartData.data.valueCount) {
        case 0:
          {
            if (!takenData.chartData.data.isCategoryAdded) {
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
            } else
              for (let index = 0; index < fieldValues.length; index++) {
                chartData.data.data[index].field1 = fieldValues[index];
              }
            chartData.data.valueCount = 1;
          }
          break;
        default:
          break;
      }
      setChartData(chartData);
    }
  }, [dropDownContent.values.selected]);

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
