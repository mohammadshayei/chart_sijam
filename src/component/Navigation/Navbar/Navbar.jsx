import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import Brand from "../../UI/Brand/Brand";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import IMAGE from "../../../assets/images/simamlogo.png";
import NavbarItems from "./NavbarItems/NavbarItems";
import { useSelector } from "react-redux";
import ErrorDialog from "../../UI/Error/ErrorDialog";
import { getUserHoldings } from "../../../api/home";

const Navbar = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)


  useEffect(() => {
    let controller = new AbortController();
    if (token && userId) {
      (async () => {
        try {
          setLoading(true)
          const result = await getUserHoldings(userId, token)
          if (result.success) {
            console.log(result.data)
          } else {
            setError(null)
            setError(<ErrorDialog type="error">{result.error}</ErrorDialog>)
          }
          setLoading(false)
          controller = null
        } catch (e) {
          // Handle fetch error
        }
      })();
    }
    return () => controller?.abort();
  }, [token, userId])

  return (
    <header className="navbar-container">
      {error}
      <ProfileDetail />
      <NavbarItems />
      <Brand brandName={stringFa.fekrafzar} brandImage={IMAGE} />
    </header>
  );
};

export default Navbar;
