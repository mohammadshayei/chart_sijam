import "./Navbar.scss";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import Brand from "../../UI/Brand/Brand";
import NavbarItems from "./NavbarItems/NavbarItems";
import Version from "../../UI/Version/Version";


const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <ProfileDetail />
      <Version/>
      <NavbarItems />
      <Brand />
    </header>
  );
};

export default Navbar;
