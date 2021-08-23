import React from "react";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import "./ToolsContainer.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../../../../styles/ThemeProvider";
import StyledButton from "./../../../UI/Button/StyledButton";

const ToolsContainer = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <div className="tools-container sijam-style-button">
      <StyledButton
        hover={themeState.isDark ? theme.surface_12dp : theme.background_color}
      >
        <div className="create-chart">
          {stringFa.create_chart}
          <div className="add-icon" style={{ color: theme.primary }}>
            <FaPlusCircle />
          </div>
        </div>
      </StyledButton>
    </div>
  );
};

export default ToolsContainer;
