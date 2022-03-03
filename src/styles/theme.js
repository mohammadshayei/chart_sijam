const lightTheme = {
  background_color: "#EEEEEE",
  surface: "#FFFFFF",
  primary: "#554ac5",
  primary_variant: "#4637ae",
  secondary: "#8D82FD",
  secondary_variant: "",
  error: "#B00020",
  error_variant: "#9e0420",
  success: "#00ca72",
  on_background: "#000",
  on_surface: "#565656",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  on_error: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  holding_menu_item_color: "rgba(56,56,56,0.05)",
  ripple_bank_color: "#332b8b",
  ripple_star_color: "#fa9435",
  ripple_holding_menu_item_color: "rgba(46, 46, 46, 0.05)",
  hover_background: "rgb(98, 139, 139)",
  border_color: "#e6e9ef",
  darken_border_color: "#bec1c7",
  hover_button: "rgb(202, 201, 201)",
  hover: "rgba(0, 0, 0, 0.1)",
  table_background: "#fff",
  // ripple_company_menu_item_color:""
};

const darkTheme = {
  background_color: "#121212",
  surface: "#000",
  surface_1dp: "rgba(255,255,255,0.05)",
  surface_2dp: "rgba(255,255,255,0.07)",
  surface_4dp: "rgba(255,255,255,0.09)",
  surface_12dp: "rgba(255,255,255,0.14)",
  surface_24dp: "rgba(255,255,255,0.16)",
  primary: "#a7a6e3",
  primary_variant: "#4637ae",
  secondary: "#8D82FD",
  secondary_variant: "",
  error: "#CF6679",
  error_variant: "#ac4f60",
  success: "#00ca72",
  on_background: "#FFFFFF",
  on_surface: "#FFFFFF",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  on_error: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  ripple_bank_color: "#332b8b",
  ripple_star_color: "#fa9435",
  ripple_holding_menu_item_color: "rgba(46, 46, 46, 0.05)",
  border_color: "#4d4d4d", //#4b4e69
  darken_border_color: "#686868",
  hover_background: "rgb(98, 139, 139)",
  hover_button: "rgb(102, 100, 100)",
  hover: "rgba(255, 255, 255, 0.1)",
  table_background: "#000",

  // ripple_company_menu_item_color:""
};

const theme = (mode) => (mode === "dark" ? darkTheme : lightTheme);

export default theme;
