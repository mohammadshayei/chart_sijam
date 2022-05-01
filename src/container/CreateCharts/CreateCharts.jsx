import React, { useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import Steps from "./Steps/Steps";
import { useNavigate, useLocation } from "react-router-dom";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../../component/UI/Button/Button.jsx";
import { useTheme } from "../../styles/ThemeProvider.js";
import * as addChartActions from "../../store/actions/addChart";
import * as chartActions from "../../store/actions/chart.js";
import * as detailActions from "../../store/actions/detail.js";
import * as holdingActions from "../../store/actions/holdingDetail.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "../../component/UI/Error/ErrorDialog.jsx";
import StyledButton from "../../component/UI/Button/StyledButton";
import DropDown from "../../component/UI/DropDown/DropDown";
import BankSection from "./BankSection/BankSection";
import Hint from "../../component/UI/Hint/Hint";
import { fetchData, onDeleteChart } from "../../api/chart";
import ShareBox from "../../component/ShareBox/ShareBox";
import AddChartToCategory from "../../component/TitleBlock/AddChartToCategory/AddChartToCategory";
import Modal from "../../component/UI/Modal/Modal";

import { VscSplitVertical, VscClose } from "react-icons/vsc";
import { FcSettings, FcFullTrash } from "react-icons/fc";
import { IoEllipsisVertical, IoSettingsOutline } from "react-icons/io5";
import { FaUserFriends, FaUser, FaRegComment } from "react-icons/fa";
import { AiOutlinePlus, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsStarFill, BsStar, BsReplyFill, BsFullscreenExit } from "react-icons/bs";
import { MdModeEditOutline } from 'react-icons/md'




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

const CreateCharts = (props) => {
  const [input, setInput] = useState(false);
  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [splitView, setSplitView] = useState("نمودار");
  const [hintShow, setHintShow] = useState({ split: false });
  const [hover, setHover] = useState({ split: false, title: false });
  const [autoValidate, setAutoValidate] = useState(false);
  const [faveCat, setFaveCat] = useState(false)
  const [shareable, setShareable] = useState(false)
  const [editable, setEditable] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [editableInput, setEditableInput] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [addChartModal, setAddChartModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [fave, setFave] = useState(false)
  const [lastBankUpdate, setLastBankUpdate] = useState(null);


  const takenData = useSelector((state) => state.addChart);
  const chartsData = useSelector((state) => state.chart);
  const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
  const { token, userId, socket } = useSelector((state) => state.auth);


  const location = useLocation();
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const navigate = useNavigate()

  // const menuItems = [
  //   {
  //     name: stringFa.exit_full_screen,
  //     id: "noFullScreen",
  //     icon: <BsFullscreenExit />,
  //   },
  //   { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
  //   { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },
  // ];

  let deletedChart;


  const searchParams = new URLSearchParams(location.search);
  const bankId = searchParams.get("bankId");
  const ref = useRef();
  const titleRef = useRef();



  const starStyles = {
    color: faveCat ? theme.star_color : theme.on_surface,
    fontSize: "1rem",
  };
  // useEffect(() => {
  //   const { chartId } = location.state;
  //   setId(chartId);
  // }, [location.state.chartId]);

  useOnClickOutside(ref, () => {
    setInput(false);
    onMouseLeave("title")
  });
  useOnClickOutside(titleRef, () => {
    setEditableInput(false);
  });

  const dispatch = useDispatch();

  const selectChartDatabase = (data) => {
    dispatch(addChartActions.selectChartData(data));
  };
  const setId = (id) => {
    dispatch(addChartActions.setAddChartId(id));
  };
  const setchartLabel = (payload) => {
    dispatch(chartActions.setchartLabel(payload));
  };

  const setChartTitle = (chartTitle) => {
    dispatch(addChartActions.setChartTitle(chartTitle));
  };
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };
  const fullscreenChart = (isFullscreen) => {
    dispatch(addChartActions.fullscreenChart(isFullscreen));
  };
  const deleteChart = (chartId) => {
    dispatch(chartActions.deleteChart(chartId));
  };
  const setIsEdit = (isEdit) => {
    dispatch(addChartActions.setIsEdit(isEdit));
  };
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };
  const updateEmptyRequireds = (emptyRequireds) => {
    dispatch(addChartActions.updateEmptyRequireds(emptyRequireds));
  };
  const setEditMode = (isEdit) => {
    dispatch(chartActions.setEditMode(isEdit));
  };
  const changeInfoINSourceCharts = (payload) => {
    dispatch(detailActions.changeInfoINSourceCharts(payload));
  };
  const updateFaveCategory = (payload) => {
    dispatch(holdingActions.updateFaveCategory(payload));
  };
  const setFilterFields = (payload) => {
    dispatch(addChartActions.setFilterFields(payload));
  };
  const clearMetaData = () => {
    dispatch(addChartActions.clearMetaData());
  };



  const toggleShareModal = () => {
    setShowModal(!showModal)
  }
  const toggleCreateCategoruModal = () => {
    setAddChartModal(!addChartModal)
  }

  const setTitleHandler = (e) => {
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setChartTitle({ title: e.target.value });
        setInput(false);
        onMouseLeave("title")
      }
    } else setChartTitle({ title: e.target.value });
  };
  const saveCustomTitle = () => {
    if (props.title === titleValue) return;
    socket.emit('change_chart_label', { chartId: takenData.id, label: titleValue, userId, holdingId: selectedHolding.holdingId })
    setchartLabel({ chartId: takenData.id, label: titleValue })
    changeInfoINSourceCharts({ chartId: takenData.id, value: titleValue, mode: "label" })
  }

  const setTitleHandlerEditMode = (e) => {
    setError(null);
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setTitleValue(e.target.value);
        setEditableInput(false);
        saveCustomTitle()
      }
    } else setTitleValue(e.target.value);
  };
  const closeHandler = () => {
    let clearedChartData = takenData.chartData;
    clearedChartData = {
      ...clearedChartData,
      title: "",
      type: "Line",
      config: {
        period: "",
        autoUpdate: false,
      },
      shareAll: false,
      editAll: false,
      viewAll: false,
      shareList: [],
      editList: [],
      viewList: [],
      data: {
        data: [],
        options: {
          ...clearedChartData.data.options,
          fieldNames: {},
          theme: "noTheme",
          insideLabel: false,
          legend: {
            display: true,
            position: "top",
            colorize: false,
            valueLabelsText: "{name}",
          },
          axes: {
            xAxes: {
              rotation: true
            },
            yAxes: {
              break: { active: false, start: 0, end: 0, size: 0 },
            }
          },
          series: {
            smooth: true,
            labels: {
              ...clearedChartData.data.options.series.labels,
              disabled: false,
              text: "{category}",
            },
          },
        },
      },
    };
    setIsEdit(false)
    setChartData(clearedChartData);
    setId("");
    selectChartDatabase([]);
    setFilterFields({ operator: "", selected: 0, fields: [] });
    clearMetaData()
    if (location.pathname === "/create_chart")
      navigate('/view')
    else
      fullscreenChart({ isFullscreen: false })
  };

  const onMouseEnter = (type) => {
    let updatedHover = { ...hover };
    updatedHover[type] = true;
    setHover(updatedHover);
  };
  const onMouseLeave = (type) => {
    let updatedHover = { ...hover };
    updatedHover[type] = false;
    setHover(updatedHover);
  };
  const fetchBankData = async () => {
    if (takenData.data.length === 0) {
      const result = await axios.post(
        `${baseUrl}api/get_data`,
        {
          id: chartsData.data[takenData.id].bankId,
        },
        { headers: { "auth-token": token } }
      );
      selectChartDatabase(result.data.result.data);
    }
  }
  const splitViewHandler = async () => {
    switch (splitView) {
      case "نمودار":
        setSplitView("تقسیم شده")
        fetchBankData()
        break;
      case "تقسیم شده":
        setSplitView("نمودار")
        break;
      // case "جدول":
      //   setSplitView("نمودار")
      //   break;

      default:
        setSplitView("نمودار")
        break;
    }
  }

  const checkValidation = (dialog) => {
    setAutoValidate(true)
    let errorText, updatedStepErrors = []
    if (!takenData.chartData.title) {
      updatedStepErrors = [...updatedStepErrors, "input"]
      errorText = stringFa.title_is_empty
    };
    if (takenData.chartData.data.data.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "xAxis", "category", "field1"]
      errorText = stringFa.field_not_chosen
    } else {
      if (!("category" in takenData.chartData.data.data[0])) {
        updatedStepErrors = [...updatedStepErrors, "category"]
        errorText = stringFa.field_not_chosen
      }
      if (!("field1" in takenData.chartData.data.data[0])) {
        updatedStepErrors = [...updatedStepErrors, "field1"]
        errorText = stringFa.field_not_chosen
      }
      if (errorText === stringFa.field_not_chosen)
        updatedStepErrors = [...updatedStepErrors, "xAxis"]
    }
    if (!takenData.chartData.editAll &&
      takenData.chartData.editList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "edit"]
      errorText = stringFa.permissions_not_defined
    }
    if (!takenData.chartData.viewAll &&
      takenData.chartData.viewList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "view"]
      errorText = stringFa.permissions_not_defined
    }
    if (!takenData.chartData.shareAll &&
      takenData.chartData.shareList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "share"]
      errorText = stringFa.permissions_not_defined
    }
    if (errorText === stringFa.permissions_not_defined) {
      updatedStepErrors = [...updatedStepErrors, "accessibility"]
    }
    updateEmptyRequireds({ emptyRequireds: updatedStepErrors })
    if (updatedStepErrors.length > 0) {
      if (dialog) {
        setError(null)
        if (updatedStepErrors.length > 1)
          setError(
            <ErrorDialog onClose={setError}>{stringFa.fill_required_items}</ErrorDialog>
          )
        else
          setError(
            <ErrorDialog onClose={setError}>{errorText}</ErrorDialog>
          )
      }
      return false
    } else
      setAutoValidate(false)
    return true
  }

  const doneClickHandler = async () => {
    const valid = checkValidation(true);
    if (!valid)
      return
    let chartApi, payload;
    let updatedChartsData = chartsData.data;
    if (location.pathname === "/create_chart") {
      chartApi = "create_chart";
      payload = {
        title: takenData.chartData.title,
        type: takenData.chartData.type,
        data: takenData.chartData.data.data,
        options: takenData.chartData.data.options,
        bankId: takenData.id,
        config: {
          period: parseInt(takenData.chartData.config.period),
          auto_update: takenData.chartData.config.autoUpdate,
        },
        holdingId: selectedHolding.holdingId,
        userId,
        shareAll: takenData.chartData.shareAll,
        editAll: takenData.chartData.editAll,
        viewAll: takenData.chartData.viewAll,
        shareList: takenData.chartData.shareAll ? [] : takenData.chartData.shareList,
        editList: takenData.chartData.editAll ? [] : takenData.chartData.editList,
        viewList: takenData.chartData.viewAll ? [] : takenData.chartData.viewList,
        dataInfo: {
          filters: takenData.metaData.filters?.map((item) => {
            return {
              filter: {
                name: item.name,
                type: item.type,
                rules: item.filters?.map((item) => {
                  return {
                    rule: {
                      field: {
                        name: item.name,
                        type: item.type,
                        value: item.value
                      },
                      content: { ...item.content }
                    }
                  }
                }),
              }
            }
          }),
          fields: takenData.metaData.fields.sort((a, b) => (a.index > b.index) ? 1 : -1).map(item => {
            return {
              field: item.value
            }
          }),
          selectedFilter: takenData.filterRules.selectedFilter,
        }
      };
    } else {
      chartApi = "edit_chart";
      payload = {
        chartId: takenData.id,
        title: takenData.chartData.title,
        type: takenData.chartData.type,
        data: takenData.chartData.data.data,
        options: takenData.chartData.data.options,
        config: {
          period: parseInt(takenData.chartData.config.period),
          auto_update: takenData.chartData.config.autoUpdate,
        },
        userId,
        shareAll: takenData.chartData.shareAll,
        editAll: takenData.chartData.editAll,
        viewAll: takenData.chartData.viewAll,
        shareList: takenData.chartData.shareAll ? [] : takenData.chartData.shareList,
        editList: takenData.chartData.editAll ? [] : takenData.chartData.editList,
        viewList: takenData.chartData.viewAll ? [] : takenData.chartData.viewList,
        dataInfo: {
          filters: takenData.metaData.filters?.map((item) => {
            return {
              filter: {
                name: item.name,
                type: item.type,
                rules: item.filters?.map((item) => {
                  return {
                    rule: {
                      field: {
                        name: item.name,
                        type: item.type,
                        value: item.value
                      },
                      content: { ...item.content }
                    }
                  }
                }),
              }
            }
          }),
          fields: takenData.metaData.fields.sort((a, b) => (a.index > b.index) ? 1 : -1).map(item => {
            return {
              field: item.value
            }
          }),
          selectedFilter: takenData.filterRules.selectedFilter,
        }
      };
    }
    setError(null);
    try {
      const result = await axios.post(`${baseUrl}api/${chartApi}`, payload, {
        headers: { "auth-token": token },
      });
      if (!result.data.success) {
        setError(
          <ErrorDialog onClose={setError}>
            {result.data.message.error}
          </ErrorDialog>
        );
      } else {
        if (location.pathname !== "/create_chart") {
          updatedChartsData = {
            ...updatedChartsData,
            [takenData.id]: {
              title: takenData.chartData.title,
              type: takenData.chartData.type,
              data: takenData.chartData.data.data,
              options: takenData.chartData.data.options,
              config: {
                ...updatedChartsData[takenData.id].config,
                period: takenData.chartData.config.period,
                auto_update: takenData.chartData.config.autoUpdate,
              },
              parent: updatedChartsData[takenData.id].parent,
              bankId: updatedChartsData[takenData.id].bankId,
              lastBankUpdate: updatedChartsData[takenData.id].lastBankUpdate,

              // shareAll: takenData.chartData.shareAll,
              // editAll: takenData.chartData.editAll,
              // viewAll: takenData.chartData.viewAll,
              // shareList: takenData.chartData.shareAll ? [] : takenData.chartData.shareList,
              // editList: takenData.chartData.editAll ? [] : takenData.chartData.editList,
              // viewList: takenData.chartData.viewAll ? [] : takenData.chartData.viewList,

              shareAll: updatedChartsData[takenData.id].shareAll,
              editAll: updatedChartsData[takenData.id].editAll,
              viewAll: updatedChartsData[takenData.id].viewAll,
              shareList: updatedChartsData[takenData.id].shareList,
              editList: updatedChartsData[takenData.id].editList,
              viewList: updatedChartsData[takenData.id].viewList,

              time: updatedChartsData[takenData.id].time,
              label: updatedChartsData[takenData.id].label,
              receivedType: updatedChartsData[takenData.id].receivedType,
              seeDuration: updatedChartsData[takenData.id].seeDuration,
              comments: updatedChartsData[takenData.id].comments,
              faveList: updatedChartsData[takenData.id].faveList,
              editedBy: updatedChartsData[takenData.id].editedBy,
              path: updatedChartsData[takenData.id].path,
              creator: updatedChartsData[takenData.id].creator,
              sharedFrom: updatedChartsData[takenData.id].sharedFrom,
            },
          };
          setChartsData(updatedChartsData);
        }
        closeHandler();
        setError(
          <ErrorDialog success={true} onClose={setError}>
            {stringFa.success_save}
          </ErrorDialog>
        );
      }
    } catch (error) {
      setError(
        <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
      );
    }
  };

  const onDelete = async () => {
    deleteChart({ chartId: props.chartId });
    try {
      const result = await onDeleteChart({ id: takenData.id }, token)
      if (result.success)
        setError(
          <ErrorDialog
            success={true}
            onClose={setError}
          >
            {stringFa.delete_chart_success}
          </ErrorDialog>
        );
      fullscreenChart({ isFullscreen: false });
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
      case "noFullScreen":
        fullscreenChart({ isFullscreen: false });
        break;
      case "setting":
        setIsEdit(true);
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
  };

  const fullScreenCloseHandler = () => {
    if (takenData.isEdit)
      doneClickHandler();
    else
      closeHandler();
  }
  const changeEditMode = async () => {
    setIsEdit(!takenData.isEdit)
    fetchBankData()
  }

  const onFaveCategoryClickHandler = () => {
    if (!selectedHolding.categories) return;
    let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave')
    if (!faveCategory) return;
    socket.emit('add_chart_to_fave_category', { chartId: takenData.id, categoryId: faveCategory.category._id, checked: !faveCat })
    updateFaveCategory({ chartId: takenData.id, checked: !faveCat })
  }
  const onFaveClick = () => {
    socket.emit('change_fave_chart', { chartId: takenData.id, isFave: !fave, userId })
  }

  useEffect(() => {
    for (const key in hover) {
      if (hover[key]) {
        const timer = setTimeout(() => {
          let updatedHintShow = { ...hintShow }
          updatedHintShow[key] = true;
          setHintShow(updatedHintShow);
        }, 200);
        return () => {
          let updatedHintShow = { ...hintShow }
          updatedHintShow[key] = false;
          setHintShow(updatedHintShow);
          return clearTimeout(timer);
        };
      }
    }
  }, [hover]);


  useEffect(() => {
    if (autoValidate)
      checkValidation(false)
  }, [takenData.chartData]);

  useEffect(() => {
    if (!bankId || !token) return;
    let controller = new AbortController();
    (async () => {
      let result = await fetchData({ id: bankId }, token)
      selectChartDatabase(result.data.data);
      setId(bankId);
      setIsEdit(true);
      setEditMode({ isEdit: true });
    })()
    return controller?.abort()
  }, [location, token])

  useEffect(() => {
    if (!selectedHolding || !selectedHolding.categories || !takenData.id) return;
    let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave')
    if (!faveCategory) return;
    let updatedFaveCat = faveCategory.category.charts.findIndex(item => item.chart === takenData.id) > -1
    setFaveCat(updatedFaveCat)
  }, [selectedHolding, takenData.id])
  // shareable={chartsData.data[takenData.id].shareList.findIndex(item => item.user._id === userId) > -1}
  useEffect(() => {
    if (Object.entries(chartsData.data).length > 0 && takenData.id) {
      setShareable(chartsData.data[takenData.id]?.shareList.findIndex(item => item.user._id === userId) > -1)
      setEditable(chartsData.data[takenData.id]?.editList.findIndex(item => item.user._id === userId) > -1)
    }
  }, [chartsData.data, takenData.id])

  useEffect(() => {
    let updatedMenuItems = [
      {
        name: stringFa.exit_full_screen,
        id: "noFullScreen",
        icon: <BsFullscreenExit />,
      },
      {
        name: stringFa.add_to_list_2,
        id: "createList",
        icon: <AiOutlinePlus />,
      }]
    if (shareable) updatedMenuItems.push({
      name: stringFa.share,
      id: "share",
      icon: <FaUserFriends />,
    })
    if (editable) {
      updatedMenuItems = [...updatedMenuItems,
      { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
      { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },]
    }
    setMenuItems(updatedMenuItems)
  }, [shareable, editable])

  useEffect(() => {
    if (!(chartsData.data[takenData?.id]?.faveList)) return;
    let fave = chartsData.data[takenData?.id].faveList.findIndex(item => item.user === userId) > -1;
    setFave(fave)
  }, [chartsData.data[takenData?.id]?.faveList])


  useEffect(() => {
    if (!(chartsData.data[takenData?.id])) return;
    let weekday = new Date(chartsData.data[takenData?.id].lastBankUpdate).toLocaleString("fa-IR", {
      weekday: "long",
    });
    let day = new Date(chartsData.data[takenData?.id].lastBankUpdate).toLocaleString("fa-IR", {
      day: "numeric",
    });
    let month = new Date(chartsData.data[takenData?.id].lastBankUpdate).toLocaleString("fa-IR", {
      month: "long",
    });
    let year_Time = new Date(chartsData.data[takenData?.id].lastBankUpdate).toLocaleString(
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
  }, [chartsData.data[takenData?.id]?.lastBankUpdate]);

  useEffect(() => {
    if (!takenData.isEdit) return
    console.log("dsf");
    let selectedChartData = chartsData.data[takenData.id];
    let takenMetaData = [], takenFilterRules;
    selectedChartData.dataInfo.filters.forEach((element, i) => {
      takenMetaData = [...takenMetaData,
      {
        id: element.filter._id,
        name: element.filter.name,
        type: element.filter.type,
        filters: element.filter.rules.map(item => {
          return {
            type: item.rule.field.type,
            name: item.rule.field.name,
            value: item.rule.field.value,
            content: item.rule.content
          }
        })
      }
      ]
      if (i === selectedChartData.dataInfo.selectedFilter)
        takenFilterRules = element.filter.rules.map(item => {
          return {
            type: item.rule.field.type,
            name: item.rule.field.name,
            value: item.rule.field.value,
            content: item.rule.content
          }
        })
    });
    setFilterFields({
      operator: takenMetaData[selectedChartData.dataInfo.selectedFilter].type,
      selected: selectedChartData.dataInfo.selectedFilter,
      fields: takenFilterRules
    })

  }, [takenData.isEdit]);


  return (
    <div
      className="create-charts-container"
      style={{
        backgroundColor: themeState.isDark
          ? theme.background_color
          : theme.surface,
        borderColor: theme.border_color,
        color: theme.on_background,
      }}
    >
      {error}

      <Modal
        show={showModal}
        modalClosed={() => setShowModal(false)}
        style={{
          height: "60%",
          width: "30%",
          minHeight: "230px",
          minWidth: "340px",
          zIndex: 600,
        }}
        bdStyle={{
          zIndex: 550,
        }}
      >
        <ShareBox chartId={takenData.id} setShowModal={setShowModal} />
      </Modal>
      <Modal
        show={addChartModal}
        modalClosed={() => setAddChartModal(false)}
        style={{
          height: "60%",
          width: "30%",
          minHeight: "230px",
          minWidth: "340px",
          zIndex: 600,
        }}
        bdStyle={{
          zIndex: 550,
        }}
      >
        <AddChartToCategory chartId={takenData.id} close={() => setAddChartModal(false)} />
      </Modal>
      {!takenData.isFullscreen && (
        <div
          className="section-header-wrapper create"
          style={{ borderColor: theme.border_color }}
        >
          <div className="header-buttons">
            <Button
              ButtonStyle={{
                flex: "0 0 auto",
                fontWeight: 400,
                marginBottom: "1rem",
                marginRight: "0.5rem",
              }}
              onClick={doneClickHandler}
            >
              {stringFa.done}
            </Button>
            <Button
              cancel={true}
              ButtonStyle={{
                flex: "0 0 auto",
                fontWeight: 400,
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
              onClick={closeHandler}
            >
              {stringFa.cancel}
            </Button>
          </div>
          <div className="settings-title-and-description">
            <div className="settings-title">{stringFa.chart_setting}</div>
            <div className="settings-description">
              {stringFa.chart_setting_description}
            </div>
          </div>
        </div>
      )}
      {takenData.isFullscreen && (
        <div
          className="section-header-wrapper"
          style={{ borderColor: theme.border_color, height: '4rem' }}
        >
          <div className="path">
            {
              chartsData.data[takenData.id]?.parent.map((text, index) => (
                <p key={`${text}${index}`} className="item">
                  {text}
                </p>)
              )
            }
          </div>
          <div className="close">
            <StyledButton
              ButtonStyle={{
                flex: "0 0 auto",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                padding: "4px",
              }}
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
              onClick={fullScreenCloseHandler}
            >
              <VscClose />
            </StyledButton>
          </div>
          <div className="action">
            {chartsData.editMode ? (
              <div className="editmode" ref={ref}>
                <StyledButton
                  ButtonStyle={{
                    fontSize: "1rem",
                    backgroundColor: takenData.isEdit
                      ? themeState.isDark
                        ? theme.surface_24dp
                        : theme.background_color
                      : "transparent",
                    marginRight: ".5rem"
                  }}
                  hover={
                    themeState.isDark ? theme.surface_1dp : theme.background_color
                  }
                  onClick={changeEditMode}

                >
                  <IoSettingsOutline />
                </StyledButton>
                <StyledButton
                  ButtonStyle={{
                    fontSize: "1rem",
                  }}
                  hover={
                    themeState.isDark ? theme.surface_1dp : theme.background_color
                  }
                  onClick={() => setDropDown(!dropDown)}
                >
                  <IoEllipsisVertical />
                </StyledButton>
                {dropDown && (
                  <DropDown
                    divStyle={{
                      top: "1.7rem",
                      right: "1rem",
                    }}
                    items={menuItems}
                    onClick={settingMenuHandler}
                    setDropDown={setDropDown}
                    divContainerRef={ref}
                  />
                )}
              </div>
            ) : (
              <div className="not_editmode">
                <div
                  className="title"
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
                      onChange={setTitleHandlerEditMode}
                      autoFocus
                      onKeyDown={setTitleHandlerEditMode}
                      style={{ borderColor: error ? "red" : "" }}
                    />
                  ) : (
                    <div className="text-component" style={{ color: chartsData?.data[takenData?.id]?.receivedType === 3 ? theme.primary : "" }} dir="rtl">
                      {
                        chartsData?.data[takenData?.id]?.label ?
                          <p>   {chartsData.data[takenData.id].label}  <span>({chartsData.data[takenData.id].title})</span></p> :
                          <p>{chartsData.data[takenData.id].title}</p>
                      }
                    </div>
                  )}
                </div>
                {shareable &&
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
      )}
      <div className="section-settings-wrapper">
        <div
          className="section-settings"
          style={{
            border: chartsData.editMode && `1px solid ${theme.border_color}`,
          }}
        >
          <div
            className="section-settings-header-wrapper"
            style={{
              borderBottom:
                chartsData.editMode && `1px solid ${theme.border_color}`,
            }}
          >
          </div>
          <div
            className="section-settings-display-type-switcher-wrapper"
            onMouseEnter={() => onMouseEnter("split")}
            onMouseLeave={() => onMouseLeave("split")}
            style={{ top: chartsData.editMode ? "1.5rem" : "-4.5rem", left: chartsData.editMode ? "1rem" : "2.5rem" }}
          >
            {hintShow.split && <Hint show={hintShow.split} hint={`نوع نمایش : ${splitView}`}
              tooltipStyle={{ left: chartsData.editMode ? "0" : "-180%", top: "0.5rem" }} arrowStyle={{ left: chartsData.editMode ? "15%" : "35%" }} />}
            <StyledButton
              ButtonStyle={{
                flex: "0 0 auto",
                fontSize: "1rem",
                marginBottom: "1rem",
                padding: "4px",
              }}
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
              onClick={splitViewHandler}
            >
              <VscSplitVertical />
            </StyledButton>
          </div>
          <div className="section-settings-content-component">
            {chartsData.editMode && (
              <div className="section-settings-content-header-container">
                <div className="base-section-settings-header-component">
                  <div
                    className={`base-section-settings-header ${input && "renaming-section"
                      }`}
                  >
                    <div
                      className="editable-component"
                      ref={ref}
                      onClick={() => {
                        setInput(true);
                      }}
                    >
                      {input ? (
                        <input
                          className="editable-input"
                          style={{
                            borderColor: takenData.emptyRequireds.length > 0 ?
                              takenData.emptyRequireds.includes("input") ?
                                theme.error :
                                theme.darken_border_color :
                              theme.darken_border_color
                          }}
                          dir="rtl"
                          placeholder={stringFa.title}
                          value={takenData.chartData.title}
                          onChange={setTitleHandler}
                          onKeyDown={setTitleHandler}
                          autoFocus
                        />
                      ) : (
                        <div className="text-component" dir="rtl"
                          onMouseEnter={() => onMouseEnter("title")}
                          onMouseLeave={() => onMouseLeave("title")}
                          style={{
                            border: takenData.emptyRequireds.length > 0 ?
                              takenData.emptyRequireds.includes("input") ?
                                `1px dashed ${theme.error}` :
                                hover.title ? `1px dashed ${theme.darken_border_color}` :
                                  "none" :
                              hover.title ? `1px dashed ${theme.darken_border_color}` :
                                "none"
                          }}>
                          <span>
                            {takenData.chartData.title
                              ? takenData.chartData.title
                              : stringFa.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(splitView === "نمودار" || splitView === "تقسیم شده") &&
              <div className="section-chart-content-container">
                <ChartSection />
              </div>}
            {(splitView === "جدول" || splitView === "تقسیم شده") &&
              <div className="table-component-container">
                <BankSection />
              </div>}
          </div>
        </div>
        {takenData.isFullscreen ?
          takenData.isEdit && <Steps type={"Line"} />
          :
          <Steps type={"Line"} />
        }
      </div>
      {
        takenData.isFullscreen &&
        <div className="footer">
          <div className="right" >
            <div className="item" >
              <p className="name">{chartsData.data[takenData?.id]?.creator?.username}</p>
              <FaUser className="icon" style={{ fontSize: "1rem" }} />
            </div>
            {
              chartsData?.data[takenData?.id]?.editedBy &&
              <div className="item" >
                <p className="name">{chartsData.data[takenData?.id]?.editedBy?.username}</p>
                <MdModeEditOutline className="icon" />
              </div>
            }
            {chartsData?.data[takenData?.id]?.receivedType === 4 &&
              <div className="item" >
                <p className="name">{chartsData.data[takenData.id].sharedFrom && chartsData.data[takenData.id].sharedFrom.username}</p>
                <BsReplyFill className="icon" />
              </div>
            }
          </div>
          <div className="left">
            <div className="like">
              {fave ?
                <AiFillHeart color="red" className="icon" onClick={onFaveClick} />
                :
                <AiOutlineHeart className="icon" onClick={onFaveClick} />
              }
              <p className="number">{chartsData?.data[takenData?.id]?.faveList?.length}</p>
            </div>
            <div className="like">
              <FaRegComment className="icon" />
              <p className="number">{chartsData?.data[takenData?.id]?.comments?.length}</p>
            </div>
            <p className="date">{lastBankUpdate}</p>

          </div>
        </div>
      }
    </div>
  );
};
export default CreateCharts;
