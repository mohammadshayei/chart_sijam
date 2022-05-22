import { memo } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./CheckBox.scss";

const CheckBox = memo(({ checked, onChange, children, style, checkmarkStyle }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="checkbox-component" style={style} >
      {children}
      <label className="checkbox-container" >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange && onChange(e)}
        />
        <span className="checkmark" style={{
          backgroundColor: checked ? theme.secondary : theme.darken_border_color,
          ...checkmarkStyle
        }}></span>
      </label >
    </div >
  );
});

export default CheckBox;
