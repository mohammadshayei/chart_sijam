import React from "react";
import "./CardSettingContainer.scss";
import { ChartBlock } from "../../../../component/ChartBlock.jsx";
import { lightTheme } from "../../../../styles/theme";
import EditTitle from "../../../../component/UI/EditTitle/EditTitle";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import SwapVertRoundedIcon from "@material-ui/icons/SwapVertRounded";
import ChartBlock from "./../../../../component/ChartBlock";

const CardSettingContainer = (props) => {
  return (
    <div className="CardSettingContainer">
      <div className="CartBodyLeftSection">
        <EditTitle style={{ marginBottom: "1.3rem", marginLeft: "5rem" }} />
      </div>
      <div className="CartBodyRightSection">
        <div className="CardSettingHeader">
          <div className="SettingVertical">
            <SettingsRoundedIcon
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <EditTitle />
          <div className="SettingBanksColor">
            <SettingsRoundedIcon
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="CardContent">
          <div className="CardContentTop">
            <div className="SwapVerticalContainer">
              <SwapVertRoundedIcon
                style={{
                  color: lightTheme.clicked_darken_color,
                  fontSize: "2.4rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="ChartShowContainer">
              <ChartBlock
                type="Line"
                data={props.data}
                options={props.options}
              />
            </div>
          </div>
          <div className="CardContentBottom">
            <div className="SwapAxisContainer">
              <UndoRoundedIcon
                style={{
                  color: lightTheme.clicked_darken_color,
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="SwapHorizontalContainer">
              <SwapHorizRoundedIcon
                style={{
                  fontSize: "2.4rem",
                  color: lightTheme.clicked_darken_color,
                  cursor: "pointer",
                }}
              />
              <EditTitle />
            </div>
            <div className="SettingHoriAxis">
              <SettingsRoundedIcon
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <LineChart  data={props.data}/> */}
    </div>
  );
};

export default CardSettingContainer;
