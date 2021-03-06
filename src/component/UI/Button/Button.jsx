import { useState } from "react";
import "./Button.scss";
import { ripple } from "../../../assets/config/ripple";
import loading_icon from "../../../assets/images/btn_loading.gif"
import { useTheme } from "../../../styles/ThemeProvider";

const Button = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => {
    if (props.onMouseEnter) props.onMouseEnter();
    if (!props.disabled)
      setHover(true);
  };
  let newStyle = {
    color: props.cancel ? theme.on_background : theme.on_primary,
    backgroundColor: props.cancel ? "transparent" : theme.primary,
  };
  const onMouseLeave = () => {
    if (props.onMouseLeave) props.onMouseLeave();
    setHover(false);
  };
  if (props.cancel && hover) {
    newStyle = { ...newStyle, backgroundColor: theme.border_color };
  }
  return (
    <button
      style={{
        ...newStyle,
        ...props.ButtonStyle,
      }}
      disabled={props.loading ? true : props.disabled}
      className={`Button ${props.ButtonClassname}`}
      onClick={(e) => {
        ripple(e, props.rippleColor);
        if (props.onClick) props.onClick();
      }}
      type={props.buttonType}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.loading ?
        <div className="loading-spinner">
          <img src={loading_icon} alt="" />
        </div>
        : props.children}
    </button>
  );
};

export default Button;
