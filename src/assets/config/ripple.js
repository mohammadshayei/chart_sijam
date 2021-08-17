import { useTheme } from "../../styles/ThemeProvider";

export const ripple = (event, color) => {
  // const themeState = useTheme();
  // const theme = themeState.computedTheme;
  // color = theme.ripple_bank_color;
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
  // console.log(`widht : ${circle.style.width} left  : widht : ${circle.style.left}  top : ${circle.style.top}`)
  circle.style.background = color;
  circle.classList.add("ripple");
  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
};
