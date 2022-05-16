import React, { useState, useEffect, useRef } from "react";
import "./XAxisStep.scss";
import { BiChevronDown } from "react-icons/bi";
import DropDown from "../../../../component/UI/DropDown/DropDown";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart";
import { useSelector, useDispatch } from "react-redux";
import StyledButton from "../../../../component/UI/Button/StyledButton.jsx";
import { MdCancel } from "react-icons/md";

const FieldPicker = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ name: "", id: "" });
  const [initial, setInitial] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const { data, metaData, isFullscreen } = useSelector((state) => state.addChart);
  const divRef = useRef();

  const dispatch = useDispatch();
  const removeDataField = (index) => {
    dispatch(addChartActions.removeDataField(index));
  };
  const changeFieldsMEtaData = (payload) => {
    dispatch(addChartActions.changeFieldsMEtaData(payload));
  };

  const setSelectedName = (value, id) => {
    let updatedSelected = { ...selected }
    updatedSelected.id = id;
    updatedSelected.name = value;
    setSelected(updatedSelected)
  }

  // const setSelectedId = (id) => {
  //   let updatedSelected = { ...selected }
  //   setSelected(updatedSelected)
  // }

  useEffect(() => {
    if (!data) return
    // console.log(data)
    if (initial && data.length > 0) {
      let firstField = true;
      let selectedField,
        menuItems = [];
      // set initial selected field for edit
      if (isFullscreen) {
        for (const field in metaData.fields) {
          if (metaData.fields[field].index === props.index) {
            for (const key in data[0]) {
              if (metaData.fields[field].value === data[0][key].fieldName) {
                selectedField = { name: key, id: data[0][key].fieldName }
              }
            }
          }
        }
      }
      for (const field in data[0]) {
        if (props.index === 0) {
          if (
            firstField &&
            data[0][field].fieldType === "عبارت‌"
          ) {
            selectedField = isFullscreen ? selectedField : { name: field, id: data[0][field].fieldName };
            firstField = false;
          }
          menuItems.push({ name: field, id: data[0][field].fieldName })
        } else if (
          props.index > 0 &&
          data[0][field].fieldType === "عدد"
        ) {
          if (firstField) {
            selectedField = isFullscreen ? selectedField : { name: field, id: data[0][field].fieldName };
            firstField = false;
          }
          menuItems.push({ name: field, id: data[0][field].fieldName })
        }
      }
      setInitial(false);
      setMenuItems(menuItems);
      if (props.index > 0) {
        setTimeout(() => {
          setSelected(selectedField);
        }, 200);
      } else
        setSelected(selectedField);
    }

    if (selected.name !== "")
      changeFieldsMEtaData({ index: props.index, value: selected.id, name: selected.name })

  }, [data, selected]);

  const removeHandler = (index) => {
    props.removeFieldPicker(index);
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
      <div
        className="setting-dropdown-component picker"
        ref={divRef}
        style={{ width: "100%" }}
      >
        {isOpen && (
          <DropDown
            divStyle={{
              top: "1.1rem",
              maxHeight: "40vh",
              minWidth: "22.4rem",
            }}
            items={menuItems}
            setSelected={setSelectedName}
            // onClick={setSelectedId}
            setDropDown={setIsOpen}
            divContainerRef={divRef}
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
          style={{ borderColor: props.error ? theme.error : theme.border_color }}
        >
          <div className="dropdown-indicator">
            <div className={`dropdown-indicator-icon ${isOpen && "rotate"}`}>
              <BiChevronDown />
            </div>
          </div>
          <div className="dropdown-title">
            <span className="title-text">{selected.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldPicker;
