import React from "react";
import "./Hint.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { animated, useTransition } from "react-spring";

const Hint = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const transitions = useTransition(props.show, {
    from: { scale: 0.8 },
    enter: { scale: 1 },
    leave: {
      scale: 0.8,
    },
    config: { mass: 0.5, tension: 500, friction: 20 },
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          className="tooltip-tip-container"
          style={{
            scale: styles.scale,
            transform: "translateY(100%)",
            backgroundColor: `${theme.on_background}`,
            color: theme.background_color,
            ...props.tooltipStyle,
          }}
        >
          <p>{props.hint}</p>
          {
            !props.hide &&
            <div
              className="arrow-tooltip"
              style={{
                borderBottom: ` 8px solid ${theme.on_background}`,
                ...props.arrowStyle,
              }}
            />
          }
        </animated.div>
      )
  );
};

export default Hint;
