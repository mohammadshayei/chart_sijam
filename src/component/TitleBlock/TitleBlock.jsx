import React, { useState, useEffect, useRef } from "react";
import "./TitleBlock.scss";
import { useTheme } from "../../styles/ThemeProvider";
import * as chartActions from "../../store/actions/chart.js";
import * as addChartActions from "../../store/actions/addChart";
import DropDown from "./../UI/DropDown/DropDown";
import { stringFa } from "./../../assets/strings/stringFaCollection";
import { chartTypes } from "../../constants/chart-types";
import { useDispatch, useSelector } from "react-redux";
import { FcSettings, FcFullTrash } from "react-icons/fc";
import { MdDragHandle, MdMoreVert } from "react-icons/md";
import { BsArrowsFullscreen, BsStarFill, BsStar } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "./../UI/Error/ErrorDialog";
import StyledButton from "../UI/Button/StyledButton";
import Modal from "./../UI/Modal/Modal";
import ShareBox from "./../ShareBox/ShareBox";
import { AiOutlinePlus } from 'react-icons/ai'
import AddChartToCategory from "./AddChartToCategory/AddChartToCategory";
import { onDeleteChart } from "../../api/chart";
import * as holdingActions from "../../store/actions/holdingDetail.js";
import * as detailActions from "../../store/actions/detail.js";


function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const TitleBlock = React.memo((props) => {
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addChartModal, setAddChartModal] = useState(false);
  const [extraItems, setExtraItems] = useState([])
  const [editableInput, setEditableInput] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [faveCat, setFaveCat] = useState(false)

  const { selectedHolding } = useSelector((state) => state.holdingDetail);
  const chartsData = useSelector((state) => state.chart);
  const { token, socket, userId } = useSelector((state) => state.auth);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const starStyles = {
    color: faveCat ? theme.star_color : theme.on_surface,
    fontSize: "1rem",
  };
  let deletedChart;



  const ref = useRef();
  const titleRef = useRef();

  useOnClickOutside(titleRef, () => {
    setEditableInput(false);
  });


  useOnClickOutside(ref, () => {
    setDropDown(false);
  });

  const dispatch = useDispatch();

  const changeInfoINSourceCharts = (payload) => {
    dispatch(detailActions.changeInfoINSourceCharts(payload));
  };
  const updateFaveCategory = (payload) => {
    dispatch(holdingActions.updateFaveCategory(payload));
  };
  const setchartLabel = (payload) => {
    dispatch(chartActions.setchartLabel(payload));
  };
  const setChartType = (chartType) => {
    dispatch(chartActions.setChartType(chartType));
  };
  const deleteChart = (chartId) => {
    dispatch(chartActions.deleteChart(chartId));
  };
  const setChart = (chartData) => {
    dispatch(chartActions.setChartData(chartData));
  };
  const setId = (id) => {
    dispatch(addChartActions.setAddChartId(id));
  };
  const selectChartDatabase = (data) => {
    dispatch(addChartActions.selectChartData(data));
  };
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };
  const setIsEdit = (isEdit) => {
    dispatch(addChartActions.setIsEdit(isEdit));
  };
  const fullscreenChart = (isFullscreen) => {
    dispatch(addChartActions.fullscreenChart(isFullscreen));
  };

  const undoDeleteChartHandler = () => {
    setChart({ chartId: props.chartId, chartData: deletedChart[0] });
  };

  const toggleShareModal = () => {
    setShowModal(!showModal)
  }
  const toggleCreateCategoruModal = () => {
    setAddChartModal(!addChartModal)
  }

  const onSetting_FullScreenClickHandler = async id => {
    const result = await axios.post(
      `${baseUrl}api/get_data`,
      {
        id: props.bankId,
      },
      { headers: { "auth-token": token } }
    );
    let selectedChartData = chartsData.data[props.chartId];
    selectedChartData = {
      title: selectedChartData.title,
      type: selectedChartData.type,
      config: {
        period: selectedChartData.config.period,
        autoUpdate: selectedChartData.config.auto_update,
      },
      shareAll: selectedChartData.shareAll ? selectedChartData.shareAll : false,
      editAll: selectedChartData.editAll ? selectedChartData.editAll : false,
      viewAll: selectedChartData.viewAll ? selectedChartData.viewAll : false,
      shareList: selectedChartData.shareList ? selectedChartData.shareList.map(item => item.user._id) : [],
      editList: selectedChartData.editList ? selectedChartData.editList.map(item => item.user._id) : [],
      viewList: selectedChartData.viewList ? selectedChartData.viewList : [],
      data: {
        data: selectedChartData.data,
        options: selectedChartData.options,
      },
    };
    setId(props.chartId);
    selectChartDatabase(result.data.result);
    setChartData(selectedChartData);
    if (id === "setting") setIsEdit(true);
    fullscreenChart({ isFullscreen: true });
  }

  const onDelete = async () => {
    // deletedChart = Object.keys(chartsData.data)
    //   .filter((key) => key === props.chartId)
    //   .map((key) => {
    //     return chartsData.data[key];
    //   });
    deleteChart({ chartId: props.chartId });
    try {
      const result = await onDeleteChart({ id: props.chartId }, token)
      if (result.success)
        setError(
          <ErrorDialog
            success={true}
            onClose={setError}
          >
            {stringFa.delete_chart_success}
          </ErrorDialog>
        );
    } catch (error) {
      setError(
        <ErrorDialog
          onClose={setError}
        >
          {stringFa.error_occured_try_again}
        </ErrorDialog>
      );
    }
  }
  const settingMenuHandler = async (id) => {
    switch (id) {
      case "fullScreen":
      case "setting":
        onSetting_FullScreenClickHandler(id)
        break;
      case "delete":
        onDelete()
        break;
      case "createList":
        toggleCreateCategoruModal()
        break;
      case "share":
        toggleShareModal()
        break;
      default:
        break;
    }
    if (id === "setting" || id === "fullScreen") {

      // setRedirect(<Redirect to="/create_chart" />);
    } else if (id === "delete") {

    } else {
      chartTypes.forEach((type) => {
        if (id === type.id) {
          setChartType({ key: props.chartId, value: id, item: "type" });
        }
      });
    }
  };

  const setTitleHandler = (e) => {
    setError(null);
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setTitleValue(e.target.value);
        setEditableInput(false);
        saveCustomTitle()
      }
    } else setTitleValue(e.target.value);
  };

  const onFaveCategoryClickHandler = () => {
    if (!selectedHolding.categories) return;
    let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave')
    if (!faveCategory) return;
    socket.emit('add_chart_to_fave_category', { chartId: props.chartId, categoryId: faveCategory.category._id, checked: !faveCat })
    updateFaveCategory({ chartId: props.chartId, checked: !faveCat })
  }


  const saveCustomTitle = () => {
    if (props.title === titleValue) return;
    socket.emit('change_chart_label', { chartId: props.chartId, label: titleValue, userId, holdingId: selectedHolding.holdingId })
    setchartLabel({ chartId: props.chartId, label: titleValue })
    changeInfoINSourceCharts({ chartId: props.chartId, value: titleValue, mode: "label" })
  }


  useEffect(() => {
    let updatedExtraItems = [{
      name: stringFa.full_screen,
      id: "fullScreen",
      icon: <BsArrowsFullscreen />,
    }, {
      name: stringFa.add_to_list_2,
      id: "createList",
      icon: <AiOutlinePlus />,
    }]
    if (props.shareable) updatedExtraItems.push({
      name: stringFa.share,
      id: "share",
      icon: <FaUserFriends />,
    })
    if (props.editable) {
      updatedExtraItems = [...updatedExtraItems,
      { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
      { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },]
    }
    setExtraItems(updatedExtraItems)
  }, [props.shareable, props.editable])

  useEffect(() => {
    if (!selectedHolding || !selectedHolding.categories) return;
    let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave')
    if (!faveCategory) return;
    let updatedFaveCat = faveCategory.category.charts.findIndex(item => item.chart === props.chartId) > -1
    setFaveCat(updatedFaveCat)
  }, [selectedHolding])

  return (
    <div className="title-container" style={{ color: theme.on_surface }}>
      {error}
      <Modal
        show={showModal}
        modalClosed={() => setShowModal(false)}
        style={{
          height: "60%",
          width: "30%",
          minHeight: "230px",
          minWidth: "340px",
        }}
      >
        <ShareBox chartId={props.chartId} setShowModal={setShowModal} />
      </Modal>
      <Modal
        show={addChartModal}
        modalClosed={() => setAddChartModal(false)}
        style={{
          height: "60%",
          width: "30%",
          minHeight: "230px",
          minWidth: "340px",
        }}
      >
        <AddChartToCategory chartId={props.chartId} close={() => setAddChartModal(false)} />
      </Modal>
      <div className="card-source-name">
        <div className="icons-container">
          <div ref={ref}>
            {dropDown && (
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
            )}
            {chartsData.editMode && (
              <StyledButton
                onClick={() => {
                  setDropDown(!dropDown);
                }}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
                ButtonStyle={{ padding: "0 0.3rem", height: "26px" }}
              >
                <MdMoreVert
                  style={{
                    color: theme.on_surface,
                    fontSize: "1.4rem",
                  }}
                />
              </StyledButton>
            )}
            {!chartsData.editMode && (
              <StyledButton
                onClick={() => settingMenuHandler("fullScreen")}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
              >
                <BsArrowsFullscreen style={{ fontSize: "1rem" }} />
              </StyledButton>
            )}
          </div>
        </div>
        <div className="details">
          {/* <p>{props.title}</p> */}
          <div
            className="editable-component"
            ref={titleRef}
            onClick={() => {
              setEditableInput(true);
              setTitleValue(props.label ? props.label : props.title)
            }}
          >
            {editableInput ? (
              <input
                className="editable-input"
                dir="rtl"
                placeholder={stringFa.title}
                value={titleValue}
                onChange={setTitleHandler}
                autoFocus
                onKeyDown={setTitleHandler}
                style={{ borderColor: error ? "red" : "" }}
              />
            ) : (
              <div className="text-component" dir="rtl">
                <span>
                  {props.label ? props.label : props.title}
                </span>
              </div>
            )}
          </div>
        </div>
        {chartsData.editMode ? (
          <div className="right-icon-container">
            {props.cardIsHover && (
              <div className="icon-container draggable-handle">
                <MdDragHandle
                  style={{ color: theme.primary, fontSize: "1.8rem" }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="right-icon-container">
            {props.shareable &&
              <StyledButton
                onClick={toggleShareModal}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
              >
                <FaUserFriends color={theme.primary} />
              </StyledButton>
            }
            <StyledButton
              onClick={toggleCreateCategoruModal}
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
            >
              <AiOutlinePlus color={theme.primary} fontSize={'1.2rem'} />
            </StyledButton>

            <StyledButton
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
              onClick={onFaveCategoryClickHandler}
            >
              {faveCat ? (
                <BsStarFill style={starStyles} />
              ) : (
                <BsStar style={starStyles} />
              )}
            </StyledButton>
          </div>
        )}
      </div>
    </div>
  );
});

export default TitleBlock;
