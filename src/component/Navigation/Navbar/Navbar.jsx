import "./Navbar.scss";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import Brand from "../../UI/Brand/Brand";
import NavbarItems from "./NavbarItems/NavbarItems";


const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <ProfileDetail />
      <NavbarItems />
      <Brand />
    </header>
  );
};

export default Navbar;
