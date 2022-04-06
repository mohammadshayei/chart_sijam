import React, { useEffect, useRef, useState } from "react";
import "./ShareBox.scss";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { useTheme } from "../../styles/ThemeProvider";
import StyledButton from "../UI/Button/StyledButton";
import { VscClose } from "react-icons/vsc";
import { baseUrl } from "../../constants/Config";
import Dropdown from "../UI/DropDown/DropDown";
import { getEmployeesChart } from "../../api/admin";
import { changeAccessChartEmployee } from "../../api/home";

import { useSelector } from "react-redux";
import ErrorDialog from "../UI/Error/ErrorDialog";

const ShareBox = ({ chartId, setShowModal }) => {
  const [focus, setFocus] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [employees, setEmployees] = useState([]);
  const { selectedHolding } = useSelector(state => state.holdingDetail)
  const { token } = useSelector(state => state.auth)



  const themeState = useTheme();
  const theme = themeState.computedTheme;


  useEffect(() => {
    if (!selectedHolding || !chartId) return;
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true)
        let result = await getEmployeesChart({ chartId, holdingId: selectedHolding.holdingId }, token)
        if (!result.success)
          setError(<ErrorDialog onClose={setError}>{result.message}</ErrorDialog>)
        setEmployees(result.data)
        setLoading(false)
        controller = null
      } catch (e) {
        setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
      }
    })();
    return () => controller?.abort();
  }, [selectedHolding, chartId])

  const ref = useRef();

  const changeStatus = async (_id, type) => {
    //locally added
    let findedEmployeeIndex = employees.findIndex(item => item.user._id === _id)
    if (findedEmployeeIndex < 0) return;
    let updatedEmployees = [...employees]
    updatedEmployees[findedEmployeeIndex].has = type === 'add' ? true : false;
    setEmployees(updatedEmployees)
    //send api 
    setLoading(true)
    let result = await changeAccessChartEmployee({ userId: _id, holdingId: selectedHolding.holdingId, chartId, status: type },token)
    setError(<ErrorDialog success={result.success} onClose={setError}>{result.data}</ErrorDialog>)
    setLoading(false)

  };
  return (
    <div className="container">
      {error}
      <StyledButton
        ButtonStyle={{
          fontSize: "1.3rem",
          padding: "4px",
          marginLeft: "-1rem",
        }}
        onClick={() => setShowModal(false)}
      >
        <VscClose />
      </StyledButton>
      <div className="text">{stringFa.sharebox_title}</div>
      <input
        type="text"
        className="input-class"
        style={{
          background: themeState.isDark ? theme.surface_1dp : theme.surface,
          color: theme.on_background,
          borderColor: focus ? theme.primary : theme.border_color,
        }}
        dir="rtl"
        placeholder={stringFa.choose_user}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.value = "";
          }
        }}
        // onChange={(e) => onChangeHandler(e)}
        onFocus={() => {
          setDropDown(true);
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
      ></input>
      {dropDown && (
        <Dropdown
          divStyle={{
            top: "6rem",
            right: "2rem",
            left: "2rem",
          }}
          items={employees.filter(item => !item.has).map(item => item.user)}
          onClick={(id) => { changeStatus(id, 'add') }}
          setDropDown={setDropDown}
          selector='username'
          divContainerRef={ref}
        />
      )}
      <div className="users-list-wrapper">
        {employees && employees.filter(item => item.has).map((item) => (
          <div
            key={item.user._id}
            className="user"
            style={{ borderColor: theme.border_color }}
          >
            <div className="user-details">
              <img src={item.user.image !== '' ? `${baseUrl}images/${item.user.image}` : `${baseUrl}images/avatar.png`} alt="user_image" className="avatar" />
              <div className="user-name">{item.user.username}</div>
            </div>
            <StyledButton
              ButtonStyle={{
                fontSize: "1rem",
                color: "rgb(140, 140, 140)",
              }}
              onClick={() => changeStatus(item.user._id, 'remove')}
            >
              <VscClose />
            </StyledButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareBox;
