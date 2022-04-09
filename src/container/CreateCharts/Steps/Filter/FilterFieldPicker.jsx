import React, { useState, useEffect, useRef } from "react";
import "./Filter.scss";
import { BiChevronDown } from "react-icons/bi";
import DropDown from "../../../../component/UI/DropDown/DropDown";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart";
// import * as fieldPickerActions from "../../../../store/actions/fieldPicker";
import { useSelector, useDispatch } from "react-redux";
import StyledButton from "../../../../component/UI/Button/StyledButton.jsx";
import { MdCancel } from "react-icons/md";

const FilterFieldPicker = (props) => {
    const takenData = useSelector((state) => state.addChart);
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const divRef = useRef();

    useEffect(() => {
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
            setMenuItems(menuItems);
        }
    }, [takenData.data]);

    const removeHandler = (index) => {
        // removeFieldPicker({ index });
        // removeDataField({ index });
    };

    return (
        <div className="filter-field-picker">
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
                        setSelected={props.setSelected}
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
                    style={{ borderColor: theme.border_color }}
                >
                    <div className="dropdown-indicator">
                        <div className={`dropdown-indicator-icon ${isOpen && "rotate"}`}>
                            <BiChevronDown />
                        </div>
                    </div>
                    <div className="dropdown-title">
                        <span className="title-text">{props.selected}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterFieldPicker;
