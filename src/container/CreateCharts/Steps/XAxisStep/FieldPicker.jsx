import React, { useState, useEffect } from "react";
import "./XAxisStep.scss";
import { BiChevronDown } from "react-icons/bi";
import DropDown from "../../../../component/UI/DropDown/DropDown";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart";
import * as fieldPickerActions from "../../../../store/actions/fieldPicker";
import { useSelector, useDispatch } from "react-redux";
import StyledButton from "../../../../component/UI/Button/StyledButton.jsx";
import { MdCancel } from "react-icons/md";

const FieldPicker = (props) => {
  const takenData = useSelector((state) => state.addChart);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [initial, setInitial] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const removeDataField = (index) => {
    dispatch(addChartActions.removeDataField(index));
  };
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };
  const removeFieldPicker = (index) => {
    dispatch(fieldPickerActions.removeFieldPicker(index));
  };

  useEffect(() => {
    if (initial) {
      if (takenData.data.fieldsType) {
        let firstField = true;
        let selected,
          menuItems = [];
        for (const title in takenData.data.fieldsType) {
          for (const key in takenData.data.fieldsType[title]) {
            if (props.index === 0) {
              if (
                firstField &&
                takenData.data.fieldsType[title][key] === "عبارت‌"
              ) {
                selected = key;
                firstField = false;
              }
              menuItems = [...menuItems, { name: key, id: title }];
            } else if (
              props.index > 0 &&
              takenData.data.fieldsType[title][key] === "عدد"
            ) {
              if (firstField) {
                selected = key;
                firstField = false;
              }
              menuItems = [...menuItems, { name: key, id: title }];
            }
          }
        }
        setInitial(false);
        setMenuItems(menuItems);
        // setSelected(selected);
      }
    }
    if (takenData.data.data) {
      let fieldValues = [];
      Object.entries(takenData.data.data).map(([key, value]) => {
        Object.entries(value).map(([k, v]) => {
          if (k === selected) {
            fieldValues = [...fieldValues, v];
          }
        });
      });
      if (selected !== "") {
        let updatedChartsData = takenData.chartData;
        if (takenData.chartData.data.data.length === 0) {
          fieldValues.forEach((field) => {
            const fieldName =
              props.index === 0 ? "category" : `field${props.index}`;
            updatedChartsData = {
              ...updatedChartsData,
              data: {
                ...updatedChartsData.data,
                data: [...updatedChartsData.data.data, { [fieldName]: field }],
                options:
                  props.index > 0
                    ? {
                        ...updatedChartsData.data.options,
                        fieldNames: {
                          ...updatedChartsData.data.options.fieldNames,
                          [fieldName]: selected,
                        },
                      }
                    : { ...updatedChartsData.data.options },
              },
            };
          });
        } else
          for (let index = 0; index < fieldValues.length; index++) {
            const fieldName =
              props.index === 0 ? "category" : `field${props.index}`;
            let chartDataUpdated = takenData.chartData.data.data;
            let chartOptionsUpdated = takenData.chartData.data.options;
            let found = false;
            for (const key in chartDataUpdated[index]) {
              if (key === fieldName) {
                chartDataUpdated[index][key] = fieldValues[index];
                found = true;
              }
            }
            if (!found) {
              chartDataUpdated[index] = {
                ...chartDataUpdated[index],
                [fieldName]: fieldValues[index],
              };
            }
            chartOptionsUpdated =
              props.index > 0
                ? {
                    ...chartOptionsUpdated,
                    fieldNames: {
                      ...chartOptionsUpdated.fieldNames,
                      [fieldName]: selected,
                    },
                  }
                : { ...chartOptionsUpdated };
            updatedChartsData = {
              ...updatedChartsData,
              data: {
                ...updatedChartsData.data,
                data: chartDataUpdated,
                options: chartOptionsUpdated,
              },
            };
          }
        setChartData(updatedChartsData);
      }
    }
  }, [takenData.data, selected]);

  const removeHandler = (index) => {
    removeFieldPicker({ index });
    removeDataField({ index });
  };

  return (
    <div className="x-axis-group">
      {props.title && (
        <div className="settings-field-title-wrapper">
          <div className="settings-field-title">
            <div>{props.title}</div>
          </div>
        </div>
      )}
      <div className="setting-dropdown-component picker">
        {isOpen && (
          <DropDown
            divStyle={{
              transform: "translateY(1.1rem)",
              maxHeight: "40vh",
              minWidth: "22.4rem",
              overflow: "auto",
              animation: "none",
            }}
            items={menuItems}
            setSelected={setSelected}
            setDropDown={setIsOpen}
          />
        )}
        {props.index > 1 && (
          <div className="item-list-item-actions">
            <StyledButton
              onClick={() => removeHandler(props.index)}
              ButtonStyle={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
            >
              <MdCancel />
            </StyledButton>
          </div>
        )}
        <div
          className={`dropdown-wrapper ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderColor: theme.border_color }}
        >
          <div className="dropdown-indicator">
            <div className={`dropdown-indicator-icon ${isOpen && "rotate"}`}>
              <BiChevronDown />
            </div>
          </div>
          <div className="dropdown-title">
            <span className="title-text">{selected}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldPicker;
