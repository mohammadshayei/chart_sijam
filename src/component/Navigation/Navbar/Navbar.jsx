import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import Brand from "../../UI/Brand/Brand";
import NavbarItems from "./NavbarItems/NavbarItems";
import { useSelector } from "react-redux";
import ErrorDialog from "../../UI/Error/ErrorDialog";
import { getUserHoldings } from "../../../api/home";
import { useDispatch } from "react-redux";
import * as holdingActions from "../../../store/actions/holdingDetail";
import * as authActions from "../../../store/actions/auth";


const Navbar = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)


  const dispatch = useDispatch();
  const setHoldings = (holdings) => {
    dispatch(holdingActions.setHoldings(holdings));
  };
  const setHoldingAccess = (info) => {
    dispatch(authActions.setHoldignAccess(info));
  };
  const setSelectedHolding = (info) => {
    dispatch(holdingActions.setHoldingInfo(info));
  };
  useEffect(() => {
    let controller = new AbortController();
    if (token && userId) {
      (async () => {
        try {
          setLoading(true)
          const result = await getUserHoldings(userId, token)
          if (result.success) {
            setHoldings(result.data)
            if (result.data.length > 0)
              setSelectedHolding(result.data[0])
            else {
              setError(null)
              setError(<ErrorDialog type="error">{result.error}</ErrorDialog>)
            }
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
      <Brand />
    </header>
  );
};

export default Navbar;
