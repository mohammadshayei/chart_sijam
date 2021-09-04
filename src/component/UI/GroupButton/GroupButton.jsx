import React, { useState } from "react";
import "./GroupButton.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import * as chartActions from "../../../store/actions/chart.js";
import { useDispatch, useSelector } from "react-redux";

const GroupButton = ({ buttonNames }) => {
  const isEdit = useSelector((state) => state.chart.editMode);
  const [btnGroups, setBtnGroups] = useState([
    {
      isEdit: true,
      selected: isEdit ? true : false,
      name: "ویرایش",
    },
    {
      isEdit: false,
      selected: isEdit ? false : true,
      name: "نمایش",
    },
  ]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setEditMode = (isEdit) => {
    dispatch(chartActions.setEditMode(isEdit));
  };

  const onClickHandler = (key) => {
    let takenButtons = [...btnGroups];
    for (const btn in takenButtons) {
      if (btn === key.toString()) {
        takenButtons[btn].selected = true;
        setEditMode({ isEdit: takenButtons[btn].isEdit });
      } else takenButtons[btn].selected = false;
    }
    setBtnGroups(takenButtons);
  };

  return (
    <div
      className="group-btn-container"
      style={{
        backgroundColor: themeState.isDark ? theme.surface_1dp : theme.surface,
        borderColor: theme.border_color,
        color: theme.on_background,
      }}
    >
      {btnGroups &&
        btnGroups.map((item, key) => (
          <div
            key={key}
            className="btn"
            style={{
              borderColor: item.selected ? theme.primary : theme.border_color,
              backgroundColor: item.selected ? theme.background_color : "",
            }}
            onClick={() => onClickHandler(key)}
          >
            {item.name}
          </div>
        ))}
    </div>
  );
};

export default GroupButton;
