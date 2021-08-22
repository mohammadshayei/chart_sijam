const lightTheme = {
  background_color: "#F9F9F9",
  surface: "#FFFFFF",
  primary: "#554ac5",
  secondary: "#8D82FD",
  on_background: "#000",
  on_surface: "#565656",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  holding_menu_item_color: "rgba(56,56,56,0.05)",
  ripple_bank_color: "#332b8b",
  ripple_star_color: "#fa9435",
  ripple_holding_menu_item_color: "rgba(46, 46, 46, 0.05)",
  background: "rgb(113, 158, 158)",
  hover_background: "rgb(98, 139, 139)",
  border_color: "#e6e9ef",
  borderBlur: "rgb(165, 162, 162)",
  button_disabled: "rgb(139, 199, 199)",
  // ripple_company_menu_item_color:""
};

const darkTheme = {
  background_color: "#121212",
  surface_1dp: "rgba(255,255,255,0.05)",
  surface_2dp: "rgba(255,255,255,0.07)",
  surface_4dp: "rgba(255,255,255,0.09)",
  surface_12dp: "rgba(255,255,255,0.14)",
  surface_24dp: "rgba(255,255,255,0.16)",
  primary: "#554ac5",
  secondary: "#8D82FD",
  on_background: "#FFFFFF",
  on_surface: "#FFFFFF",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  ripple_bank_color: "#332b8b",
  ripple_star_color: "#fa9435",
  ripple_holding_menu_item_color: "rgba(46, 46, 46, 0.05)",
  background: "rgb(113, 158, 158)",
  border_color: "#4b4e69",
  hover_background: "rgb(98, 139, 139)",
  borderBlur: "rgb(165, 162, 162)",
  button_disabled: "rgb(139, 199, 199)",
  // ripple_company_menu_item_color:""
};

const theme = (mode) => (mode === "dark" ? darkTheme : lightTheme);

export default theme;
