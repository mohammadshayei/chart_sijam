import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Brand.scss";
import IMAGE from "../../../assets/images/simamlogo.png";
import SkeletonProfile from "../../Skeletons/SkeletonProfile";
import { BsChevronDown } from 'react-icons/bs'
import { useTheme } from "../../../styles/ThemeProvider";
import DropDown from "../DropDown/DropDown";
import { baseUrl } from "../../../constants/Config";
import { useDispatch } from "react-redux";
import * as holdingActions from "../../../store/actions/holdingDetail";

const Brand = (props) => {
  const [hover, setHover] = useState(false)
  const [openHoldings, setOpenHoldings] = useState(false)
  const [data, setData] = useState([])
  const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
  const holdings = useSelector((state) => state.holdingDetail.holdings);
  const ref = useRef()

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const dispatch = useDispatch();

  const setSelectedHolding = (info) => {
    dispatch(holdingActions.setHoldingInfo(info));
  };
  useEffect(() => {
    if (!holdings) return;
    let updatedData = holdings.map(item => {
      return {
        name: item.holdingName,
        id: item.holdingId,
        icon: <img src={item.holdingImage === '' ? IMAGE : `${baseUrl}images/${item.holdingName}`} alt='holding' />
      }
    })
    setData(updatedData)
  }, [holdings])

  const openMenuClick = () => {
    setOpenHoldings(true)
  }

  const onSelectHoldingClickHandler = (id) => {
    if (!id) return;
    setOpenHoldings(false)
    setSelectedHolding(holdings.find(item => item.holdingId === id))
    setHover(false)
  }
  useEffect(() => {
    if (!openHoldings && hover) setHover(false)
  }, [openHoldings])
  return (
    <div className="brand-container"
      style={{
        border: hover ? `1px solid ${theme.border_color}` : 'none'
      }}
      ref={ref}

    >
      <div className="brand-warpper"
        onMouseLeave={() => {
          if (!openHoldings)
            setHover(false)
        }}
        onMouseEnter={() => setHover(true)}
        onClick={openMenuClick}
      >
        {
          selectedHolding ?
            <>
              <img src={IMAGE} alt="brand image" />
              <span style={{ color: "#A49BFF" }}>{selectedHolding && selectedHolding.holdingName}</span>
              <BsChevronDown style={{
                color: theme.border_color,
                fontSize: '15px',
                position: 'absolute',
                left: '.2rem',
                display: hover ? 'flex' : "none"
              }} />
            </>
            : <SkeletonProfile divStyle={{ flexDirection: "row-reverse", margin: 0, padding: 0 }} />
        }
        {/* <div className="list-holdings"> */}
        {
          openHoldings &&
          <DropDown
            divContainerRef={ref}
            items={data}
            setDropDown={setOpenHoldings}
            onClick={onSelectHoldingClickHandler}
            divStyle={{
              top: "12px",
              width: "228px"
            }}
          />
        }

        {/* {dropDown && (
              <DropDown
                divStyle={{
                  top: "0.6rem",
                }}
                items={chartTypes}
                extraItems={extraItems}
                onClick={settingMenuHandler}
                setDropDown={setDropDown}
                divContainerRef={ref}
              />
            )} */}

        {/* {
            holdings && holdings.map(
              holding => <HoldingItem name={holding.holdingName} image={holding.holdingImage} />)
          } */}
        {/* </div> */}
      </div>
    </div >
  );
};

export default Brand;
