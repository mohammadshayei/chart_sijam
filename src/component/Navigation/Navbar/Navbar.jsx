import React from "react";
import "./Navbar.scss";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import Brand from "../../UI/Brand/Brand";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import IMAGE from "../../../assets/images/simamlogo.png";
import NavbarItems from "./NavbarItems/NavbarItems";

const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <ProfileDetail />
      <NavbarItems />
      <Brand brandName={stringFa.fekrafzar} brandImage={IMAGE} />
    </header>
  );
};

export default Navbar;
