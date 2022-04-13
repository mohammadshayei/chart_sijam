import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useTheme } from "../../../styles/ThemeProvider.js";
import "./SelectBankModal.scss";
import Button from "./../../../component/UI/Button/Button";
import axios from "axios";
import { baseUrl } from "./../../../constants/Config";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { GoVerified } from "react-icons/go";
import ErrorDialog from "../../../component/UI/Error/ErrorDialog.jsx";
import * as selectDatabaseActions from "../../../store/actions/addChart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { fetchData } from "../../../api/chart.js";

const SelectBankModal = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({ error: "", result: null });
  const [bankAddress, setBankAddress] = useState({
    companies: {
      _id: 0,
      name: `${stringFa.companies}`,
      active: true,
      verified: false,
    },
    softwares: {
      _id: 0,
      name: `${stringFa.softwares}`,
      active: false,
      verified: false,
    },
    active_backup: {
      _id: 0,
      name: `${stringFa.active_backup}`,
      active: false,
      verified: false,
    },
    banks: { _id: 0, name: `${stringFa.banks}`, active: false, verified: false },
  });
  const [placeHolder, setPlaceHolder] = useState(null);
  const [state, setState] = useState('companies')
  const [isDone, setIsDone] = useState(false);
  const [searchResult, setSearchResult] = useState({ error: "", result: null });
  // const [contentHeight, setContentHeight] = useState("305px");
  // const [ref, { height }] = useMeasure();


  const { token, holdingAccess } = useSelector((state) => state.auth);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  let navigate = useNavigate()

  const loadingAnimation = useSpring({
    opacity: loading ? 1 : 0,
    from: { opacity: 0 },
  });
  // const expand = useSpring({
  // height: loading ? "305px" : `${contentHeight}px`,
  // });

  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Escape") {
      props.isModalOpen(false);
    }
  };

  const dispatch = useDispatch();
  const selectChartDatabase = (data) => {
    dispatch(selectDatabaseActions.selectChartData(data));
  };
  const setId = (id) => {
    dispatch(selectDatabaseActions.setAddChartId(id));
  };

  const onChangeHandler = (event) => {
    let updatedResult = { ...searchResult };
    updatedResult.result = data.result.filter((item) => {
      return item.name.indexOf(event.target.value) >= 0;
    });
    setSearchResult(updatedResult);
  };


  // useEffect(() => {
  //   setContentHeight(height);
  //   //Adds resize event listener
  //   window.addEventListener("resize", setContentHeight(height));
  //   // Clean-up
  //   return window.removeEventListener("resize", setContentHeight(height));
  // }, [height]);

  const fetchDataFromHoldingAccess = (parent) => {
    let result = []
    switch (parent.length) {
      case 0:
        result = holdingAccess.map(cmp => {
          return {
            _id: cmp._id,
            name: cmp.name
          }
        })
        break;
      case 1:
        result = holdingAccess.find(cmp => cmp._id === parent[0]).softwares.map(sft => {
          return {
            _id: sft._id,
            name: sft.name
          }
        })
        break;
      case 2:
        result = holdingAccess.find(cmp => cmp._id === parent[0])
          .softwares.find(sft => sft._id === parent[1])
          .active_backups.map(acb => {
            return {
              _id: acb._id,
              name: acb.name
            }
          })
        break;
      case 3:
        result = holdingAccess.find(cmp => cmp._id === parent[0])
          .softwares.find(sft => sft._id === parent[1])
          .active_backups.find(acb => acb._id === parent[2])
          .banks.map(bnk => {
            return {
              _id: bnk._id,
              name: bnk.name
            }
          })
        break;
      default:
        break;
    }

    return result;
  }

  useEffect(() => {
    if (!holdingAccess) return;
    for (const item in bankAddress) {
      if (bankAddress[item].active)
        setPlaceHolder(`جستجوی ${bankAddress[item].name}`);
    }
    if (bankAddress.companies.active) {
      let result = fetchDataFromHoldingAccess([])
      setData({
        error: null,
        result: result,
      });
      setSearchResult({
        error: null,
        result: result,
      });
      setLoading(false);
    }
  }, [bankAddress, holdingAccess]);

  const updateAddress = async ({ _id, name }) => {
    let parent = [], nextProp, isDone = false;
    switch (state) {
      case 'companies':
        nextProp = 'softwares'
        parent = [_id]
        break;
      case 'softwares':
        nextProp = 'active_backup'
        parent = [bankAddress.companies._id, _id]
        break;
      case 'active_backup':
        nextProp = 'banks'
        parent = [bankAddress.companies._id, bankAddress.softwares._id, _id]
        break;
      case 'banks':
        isDone = true
        break;
      default:
        break;
    }
    let updatedBankAddress = { ...bankAddress }
    updatedBankAddress[state]._id = _id;
    updatedBankAddress[state].name = name;
    updatedBankAddress[state].verified = true;
    updatedBankAddress[state].active = false;

    if (!isDone) updatedBankAddress[nextProp].active = true;

    setBankAddress(updatedBankAddress)

    if (!isDone) {
      let result = fetchDataFromHoldingAccess(parent)
      setData({
        error: null,
        result: result,
      });
      setSearchResult({
        error: null,
        result: result,
      });

      setState(nextProp)
    } else setIsDone(isDone)

  };

  const clearAddress = async (key) => {
    setState(key)
    let updatedClearAddress = { ...bankAddress };
    let start = false;
    let parent = [];
    for (const itemKey in updatedClearAddress) {
      if (itemKey === key) start = true;
      if (!start)
        parent = [...parent, updatedClearAddress[itemKey]._id]
      if (start) {
        updatedClearAddress[itemKey]._id = 0;
        updatedClearAddress[itemKey].name = `${stringFa[itemKey]}`;
        if (itemKey === key) updatedClearAddress[itemKey].active = true;
        else updatedClearAddress[itemKey].active = false;
        updatedClearAddress[itemKey].verified = false;
      }
    }
    setBankAddress(updatedClearAddress);
    setIsDone(false);
    let result = fetchDataFromHoldingAccess(parent)
    setData({
      error: null,
      result: result,
    });
    setSearchResult({
      error: null,
      result: result,
    });
  };

  const submitHandler = async (_id) => {
    navigate('/create_chart')
    let result = await fetchData({ id: _id }, token)
    selectChartDatabase(result.data);
    setId(_id);
    setIsEdit(true);
    props.isModalOpen(false);
  };

  return (
    <div
      className="select-bank-modal-wrapper"
      tabIndex="0"
      onKeyDown={(e) => keyDownHandler(e)}
    // style={expand}
    >
      {/* <div ref={ref}> */}
      {error}
      <div className="select-bank-modal-top">
        <div className="select-bank-title">
          <div className="title">{stringFa.select_database}</div>
          <div className="title description">
            {stringFa.select_database_description}
          </div>
        </div>
        <div className="select-bank-input-wrapper">
          <div className="select-bank-address">
            {Object.entries(bankAddress).map(([k, v]) => {
              return (
                <div className="address-part" key={k}>
                  {k !== "banks" ? "  /  " : ""}
                  <div
                    className="address-item"
                    style={{
                      color: v.active
                        ? theme.on_background
                        : v.verified
                          ? theme.primary
                          : theme.on_background,
                      opacity: v.active ? 1 : v.verified ? 1 : 0.5,
                      fontStyle: v.verified ? "italic" : "",
                    }}
                  >
                    {v.verified && (
                      <div
                        className="clear-address"
                        onClick={() => clearAddress(k)}
                      >
                        <IoMdCloseCircle />
                      </div>
                    )}
                    {v.name}
                  </div>
                </div>
              );
            })}
            {isDone && (
              <div
                className="success-checkbox-icon"
                style={{ color: theme.primary }}
              >
                <GoVerified />
              </div>
            )}
          </div>
          {!isDone && (
            <input
              type="text"
              className="input-class"
              style={{
                background: themeState.isDark
                  ? theme.surface_1dp
                  : theme.surface,
                color: theme.on_background,
                borderColor: focus ? theme.primary : theme.darken_border_color,
              }}
              dir="rtl"
              placeholder={placeHolder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.value = "";
                  updateAddress({ _id: searchResult.result[0]._id, name: searchResult.result[0].name })
                }
              }}
              onChange={(e) => onChangeHandler(e)}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
            />
          )}
          {!isDone && (
            <div className="search-icon">
              <IoIosSearch />
            </div>
          )}
        </div>
        {isDone ? (
          <div className="success"></div>
        ) : (
          <div className="select-bank-picker">
            <div className="select-bank-data">
              {searchResult.result &&
                (!searchResult.error
                  ? Object.entries(searchResult.result).map(([k, v]) => {
                    return (
                      <div
                        key={k}
                        className="selection-item"
                        onClick={() =>
                          updateAddress(v)
                        }
                      >
                        {v.name}
                      </div>
                    );
                  })
                  : searchResult.error)}
            </div>
          </div>
        )}
      </div>

      <div className="select-bank-modal-footer">
        <Button
          ButtonStyle={{
            backgroundColor: isDone ? theme.primary : "lightslategray",
            cursor: isDone ? "pointer" : "default",
            color: theme.on_primary,
          }}
          disabled={isDone ? false : true}
          onClick={() => submitHandler(bankAddress.banks._id)}
        >
          {stringFa.done}
        </Button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SelectBankModal;
