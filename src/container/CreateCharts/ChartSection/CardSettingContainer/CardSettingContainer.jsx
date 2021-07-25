import React from "react";
import "./CardSettingContainer.scss";
import { lightTheme } from "../../../../styles/theme";
import EditTitle from "../../../../component/UI/EditTitle/EditTitle";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import SwapVertRoundedIcon from "@material-ui/icons/SwapVertRounded";

const CardSettingContainer = (props) => {
  return (
    <div className="CardSettingContainer">
      <div className="CartBodyLeftSection">
        <EditTitle />
      </div>
      <div className="CartBodyRightSection">
        <div className="CardSettingHeader">
          <EditTitle />
        </div>
        <div className="CardContent">
          <div className="CardContentTop">
            <div className="SwapVerticalContainer">
              <SwapVertRoundedIcon
                style={{
                  color: lightTheme.clicked_darken_color,
                  fontSize: "2.4rem",
                }}
              />
            </div>
            <div className="ChartShowContainer">Line
            </div>
          </div>
          <div className="CardContentBottom">
            <div className="SwapAxisContainer">
              <UndoRoundedIcon
                style={{
                  color: lightTheme.clicked_darken_color,
                }}
              />
            </div>
            <div className="SwapHorizontalContainer">
              <SwapHorizRoundedIcon
                style={{
                  fontSize: "2.4rem",
                  color: lightTheme.clicked_darken_color,
                }}
              />
              <EditTitle />
            </div>
            <div className="SettingHoriAxis">
              <SettingsRoundedIcon />
            </div>
          </div>
        </div>
      </div>
      {/* <LineChart  data={props.data}/> */}
    </div>
  );
};

export default CardSettingContainer;
