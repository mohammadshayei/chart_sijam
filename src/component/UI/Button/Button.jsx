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
    color: theme.on_primary,
    backgroundColor: props.disabled ? "#adaebb" :
      hover ? theme.primary_variant : theme.primary,
    cursor: props.disabled ? "default" : "pointer"
  };
  const onMouseLeave = () => {
    if (props.onMouseLeave) props.onMouseLeave();
    setHover(false);
  };
  if (props.hoverBGColor && hover) {
    newStyle = { ...newStyle, backgroundColor: props.hoverBGColor };
  }
  return (
    <button
      style={{
        ...props.ButtonStyle,
        ...newStyle,
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
