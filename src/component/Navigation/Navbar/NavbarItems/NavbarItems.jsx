import React, { useState } from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import "./NavbarItems.scss";

const NavbarItems = (props) => {
  const [orderMenu, setOrderMenu] = useState({
    view: {
      hint: "مشاهده نمودار",
      onClick: () => {},
      pathname: "/view",
    },
  });

  return (
    <div className="navbar-items-container">
      <ul>
        {Object.entries(orderMenu).map(([k, v]) => (
          <li key={k}>
            <NavbarItem  name={k} detail={v} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarItems;
