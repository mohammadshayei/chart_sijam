import React from "react";
import "./ErrorDialog.scss";
import ReactDom from "react-dom";
import { useTheme } from "../../../styles/ThemeProvider.js";
import StyledButton from "./../Button/StyledButton";
import { IoClose } from "react-icons/io5";
import { BiMessageSquareError } from "react-icons/bi";
import { useAnimatePresence } from "use-animate-presence";

const popupVariants = {
  y: {
    from: 0,
    to: 200,
  },
};

const ErrorDialog = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const popup = useAnimatePresence({
    variants: popupVariants,
    initial: "visible",
    options: {
      stiffness: 1000,
      mass: 2,
      damping: 50,
    },
  });

  React.useEffect(() => {
    setTimeout(() => {
      popup.togglePresence();
    }, 9000);
  }, []);

  if (!popup.isRendered) return null;

  const closeHandler = () => {
    props.onClose(null);
  };

  return ReactDom.createPortal(
    <div
      ref={popup.ref}
      className="error-box"
      style={{ backgroundColor: theme.error, color: theme.on_error }}
    >
      <div className="exit-icon">
        <StyledButton
          onClick={closeHandler}
          hover={themeState.isDark ? theme.surface_1dp : "rgba(0,0,0,0.2)"}
          ButtonStyle={{ marginRight: "1.5rem" }}
        >
          <IoClose style={{ color: theme.on_error }} />
        </StyledButton>
      </div>
      {props.children}
      <BiMessageSquareError
        style={{ fontSize: "1.3rem", margin: "0 0.5rem" }}
      />
    </div>,
    document.getElementById("portal")
  );
};

export default ErrorDialog;
