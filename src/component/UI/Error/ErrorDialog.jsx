import React from "react";
import "./ErrorDialog.scss";
import ReactDom from "react-dom";
import { useTheme } from "../../../styles/ThemeProvider.js";
import StyledButton from "./../Button/StyledButton";
import { IoClose } from "react-icons/io5";
import { BiMessageSquareError } from "react-icons/bi";
import { IoCheckmark } from "react-icons/io5";
import { useAnimatePresence } from "use-animate-presence";
import { stringFa } from "./../../../assets/strings/stringFaCollection";

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
    if (props.success) {
      setTimeout(() => {
        popup.togglePresence();
      }, 30000);
    } else {
      setTimeout(() => {
        popup.togglePresence();
      }, 9000);
    }
  }, []);

  if (!popup.isRendered) return null;

  const closeHandler = () => {
    props.onClose(null);
  };

  const handleUndo = () => {
    props.onClose(null);
    props.undoClick && props.undoClick();
  };

  return ReactDom.createPortal(
    <div
      ref={popup.ref}
      className="error-box"
      style={{
        backgroundColor: props.success ? theme.success : theme.error,
        color: theme.on_error,
      }}
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
      {props.undoNeeded && props.success && (
        <div className="undo-button" onClick={() => handleUndo()}>
          {stringFa.undo}
        </div>
      )}
      {props.children}
      {props.success ? (
        <IoCheckmark style={{ fontSize: "1.3rem", margin: "0 0.5rem" }} />
      ) : (
        <BiMessageSquareError
          style={{ fontSize: "1.3rem", margin: "0 0.5rem" }}
        />
      )}
    </div>,
    document.getElementById("portal")
  );
};

export default ErrorDialog;
