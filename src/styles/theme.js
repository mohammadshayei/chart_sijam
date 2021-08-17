const lightTheme = {
  text_color: "#565656",
  star_color: "#FF9F43",
  clicked_darken_color: "#554ac5",
  clicked_lighten_color: "#8D82FD",
  background_color: "#f9f9f9",
  arrows_color: "#8D8D8D",
  menu_icons_color: "#000",
  holding_menu_item_color: "rgba(56,56,56,0.05)",
  text_clicked_menu_color: "#ffffff",
  text_menu_item_color: "#000",
  ripple_bank_color: "#332b8b",
  ripple_star_color: "#fa9435",
  ripple_holding_menu_item_color: "rgba(46, 46, 46, 0.05)",
  background: "rgb(113, 158, 158)",
  border_color: "#e6e9ef",
  hover_background: "rgb(98, 139, 139)",
  borderBlur: "rgb(165, 162, 162)",
  button_disabled: "rgb(139, 199, 199)",
  // ripple_company_menu_item_color:""
};

const darkTheme = {
  text_color: "#FFFFFF",
  star_color: "#FF9F43",
  clicked_darken_color: "#554ac5",
  clicked_lighten_color: "#8D82FD",
  background_color: "#252333",
  arrows_color: "#8D8D8D",
  menu_icons_color: "#000",
  holding_menu_item_color: "rgba(56,56,56,0.05)",
  text_clicked_menu_color: "#ffffff",
  text_menu_item_color: "#000",
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
