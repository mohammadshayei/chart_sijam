import React, { useState, useEffect } from "react";
import "./Card.scss";
import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";
import { useTheme } from "../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { BsReplyFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import * as chartActions from "../../store/actions/chart.js";
import * as detailActions from "../../store/actions/detail.js";

const Card = React.memo((props) => {
  const chartsData = useSelector((state) => state.chart);
  const [isHover, setIsHover] = useState(false);
  const [lastBankUpdate, setLastBankUpdate] = useState(null);
  const [fave, setFave] = useState(false)



  const { userId, socket } = useSelector((state) => state.auth);

  const themeState = useTheme();
  const theme = themeState.computedTheme;


  const dispatch = useDispatch();

  const updateFaveList = (payload) => {
    dispatch(chartActions.updateFaveList(payload));
  };
  const changeInfoINSourceCharts = (payload) => {
    dispatch(detailActions.changeInfoINSourceCharts(payload));
  };
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  const onFaveClick = () => {
    socket.emit('change_fave_chart', { chartId: props.chartId, isFave: !fave, userId })
  }


  useEffect(() => {
    let weekday = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      weekday: "long",
    });
    let day = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      day: "numeric",
    });
    let month = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      month: "long",
    });
    let year_Time = new Date(props.item.lastBankUpdate).toLocaleString(
      "fa-IR",
      {
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }
    );
    const lastBankUpdate = `${weekday} - ${day} ${month} ${year_Time}`;
    setLastBankUpdate(lastBankUpdate);
  }, [props.item.lastBankUpdate]);


  useEffect(() => {
    if (!socket) return;
    socket.on('get_fave_chart', (({ chartId, updatedFaves }) => {
      updateFaveList({ chartId, faveList: updatedFaves })
      changeInfoINSourceCharts({ chartId: props.chartId, value: updatedFaves, mode: 'fave', })
    }))
  }, [socket])

  useEffect(() => {
    if (!props.item.faveList) return;
    let fave = props.item.faveList.findIndex(item => item.user === userId) > -1;
    setFave(fave)
  }, [props.item.faveList])

  // 1-> access, 2-> creator, 3-> specific send  ,4-> shared to you

  return (
    <div
      className="card card-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: isHover
          ? themeState.isDark
            ? theme.surface_4dp
            : theme.surface
          : themeState.isDark
            ? theme.surface_1dp
            : theme.surface,
        border: chartsData.editMode
          ? isHover
            ? `1px solid ${theme.primary}`
            : `1px solid ${theme.border_color}`
          : `1px solid ${theme.border_color}`,
      }}
    >
      <TitleBlock
        chartId={props.chartId}
        chartType={props.item.type}
        title={props.item.title}
        label={props.item.label}
        parent={props.item.parent}
        bankId={props.item.bankId}
        editable={props.item.editList.findIndex(item => item.user._id === userId) > -1}
        shareable={props.item.shareList.findIndex(item => item.user._id === userId) > -1}
        cardIsHover={isHover}
      />
      <div className="card-body">
        <ChartBlock chartId={props.chartId} chartProps={props.item} />
      </div>
      <div className="card-footer">
        <div className="left-side">
          <div className="like">
            {fave ?
              <AiFillHeart color="red" className="icon" onClick={onFaveClick} />
              :
              <AiOutlineHeart className="icon" onClick={onFaveClick} />
            }
            <p className="number">{props.item.faveList.length}</p>
          </div>
          <div className="like">
            <FaRegComment className="icon" />
            <p className="number">{props.item.comments.length}</p>
          </div>
          <p className="date">{lastBankUpdate}</p>

        </div>
        <div className="right-side">
          {props.item.receivedType === 4 &&
            <div className="item" style={{ marginRight: ".5rem" }}>
              <p className="name">{props.item.sharedFrom && props.item.sharedFrom.username}</p>
              <BsReplyFill className="icon" />
            </div>
          }
          <div className="item" >
            <p className="name">{props.item.editedBy ? props.item.editedBy.username : props.item.creator.username}</p>
            <MdModeEditOutline className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
