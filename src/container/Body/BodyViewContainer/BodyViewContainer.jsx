import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../styles/ThemeProvider";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import "./BodyViewConainer.scss";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import BodyContent from "./BodyContent/BodyContent";
import * as chartActions from "../../../store/actions/chart.js";
import * as detailActions from "../../../store/actions/detail.js";
import axios from "axios";
import { baseUrl } from "./../../../constants/Config";
import ErrorDialog from "../../../component/UI/Error/ErrorDialog.jsx";
import SelectBankModal from "../../CreateCharts/SelectBankModal/SelectBankModal";
import BanksContainer from "./BanksContainer/BanksContainer";
import HeaderViewContent from "./HeaderViewContent/HeaderViewContent";
import Modal from "../../../component/UI/Modal/Modal";
const PERIOD_INTRAVEL = 60000;

const BodyViewContainer = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [filteredCharts, setFilteredCharts] = useState([])

  const detail = useSelector((state) => state.detail);
  const { token, parentsCharts } = useSelector((state) => state.auth);
  const { selectedCompanies, selectedSoftwares, selectedActiveBackups, selectedBanks, sourceCharts } = useSelector((state) => state.detail);
  const chartsData = useSelector((state) => state.chart);
  const { selectedCategory } = useSelector((state) => state.holdingDetail);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setSourceChart = (payload) => {
    dispatch(detailActions.setSourceCharts(payload));
  };
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };
  const updateChartData = (chartData) => {
    dispatch(chartActions.updateChartData(chartData));
  };
  const clearCharts = () => {
    dispatch(chartActions.clearCharts());
  };

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
  }
  let depend = selectedCategory?.charts.length


  useEffect(() => {
    if (!parentsCharts) return;
    let charts = [];
    parentsCharts.forEach(cmp => {
      cmp.softwares.forEach(sft => {
        sft.active_backups.forEach(acb => {
          acb.banks.forEach(bnk => {
            charts = [...charts, ...bnk.charts.map(item => {
              return {
                ...item,
                time: { start: '', isSee: false, duration: 0 },
                chart: {
                  ...item.chart,
                  path: [cmp._id, sft._id, acb._id, bnk._id],
                  parent: [cmp.name, sft.name, acb.name, bnk.name],
                }
              }
            })]
          })
        })
      })
    })
    setSourceChart({ charts })

  }, [parentsCharts])


  useEffect(() => {
    if (!parentsCharts || sourceCharts.length === 0) return;
    clearCharts();
    let charts = [];
    //holding selected ....
    if (selectedCompanies.length === 0 && selectedSoftwares.length === 0 && selectedActiveBackups.length === 0 && selectedBanks.length === 0) {
      parentsCharts.forEach(cmp => {
        cmp.softwares.forEach(sft => {
          sft.active_backups.forEach(acb => {
            acb.banks.forEach(bnk => {
              charts = [...charts, ...bnk.charts.map(item => {
                return {
                  ...item,
                  chart: {
                    ...item.chart,
                    path: [cmp._id, sft._id, acb._id, bnk._id],
                    parent: [cmp.name, sft.name, acb.name, bnk.name]
                  }
                }
              })]
            })
          })
        })
      })
    }
    else {
      parentsCharts.forEach(cmp => {
        if (selectedCompanies.findIndex(item => item.value === cmp._id) > -1) {
          cmp.softwares.forEach(sft => {
            sft.active_backups.forEach(acb => {
              acb.banks.forEach(bnk => {
                charts = [...charts, ...bnk.charts.map(item => {
                  return {
                    ...item,
                    chart: {
                      ...item.chart,
                      path: [cmp._id, sft._id, acb._id, bnk._id],
                      parent: [sft.name, acb.name, bnk.name]
                    }
                  }
                })]
              })
            })
          })
        } else {
          cmp.softwares.forEach(sft => {
            if (selectedSoftwares.findIndex(item => item.value === sft._id) > -1) {
              sft.active_backups.forEach(acb => {
                acb.banks.forEach(bnk => {
                  charts = [...charts, ...bnk.charts.map(item => {
                    return {
                      ...item,
                      chart: {
                        ...item.chart,
                        parent: [acb.name, bnk.name],
                        path: [cmp._id, sft._id, acb._id, bnk._id],
                      }
                    }
                  })]
                })
              })
            } else {
              sft.active_backups.forEach(acb => {
                if (selectedActiveBackups.findIndex(item => item.value === acb._id) > -1) {
                  acb.banks.forEach(bnk => {
                    charts = [...charts, ...bnk.charts.map(item => {
                      return {
                        ...item,
                        chart: {
                          ...item.chart,
                          parent: [bnk.name],
                          path: [cmp._id, sft._id, acb._id, bnk._id],
                        }
                      }
                    })]
                  })
                }
                else {
                  acb.banks.forEach(bnk => {
                    if (selectedBanks.findIndex(item => item.value === bnk._id) > -1) {
                      charts = [...charts, ...bnk.charts.map(item => {
                        return {
                          ...item,
                          chart: {
                            ...item.chart,
                            parent: [],
                            path: [cmp._id, sft._id, acb._id, bnk._id],
                          }
                        }
                      })]
                    }

                  })
                }
              })
            }


          })
        }
      })
    }
    if (selectedCategory)
      charts = charts.filter(item => selectedCategory.charts.findIndex(chrt => chrt.chart === item.chart._id) > -1)
    setFilteredCharts(sourceCharts.filter(item => charts.findIndex(chrt => chrt.chart._id === item.chart._id) > -1))
  }, [parentsCharts, selectedCompanies.length, selectedSoftwares.length, selectedActiveBackups.length, selectedBanks.length, selectedCategory, depend, sourceCharts.length])

  useEffect(() => {
    if (filteredCharts.length === 0) return;
    let newChartsData = {};
    filteredCharts.forEach((item) => {
      newChartsData = {
        ...newChartsData,
        [item.chart._id]: {
          title: item.chart.title,
          type: item.chart.type,
          data: item.chart.data,
          options: item.chart.options,
          config: item.chart.config,
          parent: item.chart.parent,
          path: item.chart.path,
          bankId: item.chart.bankCreator._id,
          lastBankUpdate: item.chart.data_updated_time,
          comments: item.chart.comments,
          editList: item.chart.edit,
          shareList: item.chart.share,
          editedBy: item.chart.edited_by,
          faveList: item.chart.fave_list,
          creator: item.chart.userCreator,
          seeDuration: item.see_duration,
          receivedType: item.type,
          sharedFrom: item.shared_from,
          label: item.label,
          time: item.time,
        },
      };
    });
    setChartsData(newChartsData);
  }, [filteredCharts])



  const timer = async () => {
    let result;
    for (const chartId in chartsData.data) {
      let lastUpdate = new Date(chartsData.data[chartId].config.last_update);
      let period = chartsData.data[chartId].config.period;
      let now = new Date(
        new Date(new Date()).setHours(new Date().getHours() + 1)
      );
      if (getDifferenceInMinutes(now, lastUpdate) > period) {
        result = await axios.post(
          `${baseUrl}api/get_chart`,
          {
            id: chartId,
          },
          { headers: { "auth-token": token } }
        );
        if (result) {
          updateChartData({
            chartId,
            chartData: result.data.message.result,
            lastUpdate: new Date(),
          });
        }
      }
    }
  };

  useEffect(() => {
    const updateChart = setInterval(() => {
      timer();
    }, PERIOD_INTRAVEL);
    return () => {
      clearInterval(updateChart);
    };
  }, [chartsData]);
  const countProperties = (obj) => {
    var count = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) ++count;
    }
    return count;
  };
  return (
    <div
      className="body-container"
    >
      <div
        className="header-body-view-container"
        style={{
          borderColor: theme.border_color,
          backgroundColor: themeState.isDark
            ? theme.surface_12dp
            : theme.surface,
        }}
      >
        <HeaderViewContent setIsModalOpen={setIsModalOpen} />
      </div>
      {detail.banks.length > 0 && (
        <div
          className="bank-container"
          style={{
            borderColor: theme.border_color,
            backgroundColor: themeState.isDark
              ? theme.surface_12dp
              : theme.surface,
          }}
        >
          <BanksContainer />
        </div>
      )}
      <Modal
        show={isModalOpen}
        modalClosed={() => setIsModalOpen(false)}
        style={{
          height: "60%",
          width: "35%",
          minHeight: "290px",
          minWidth: "550px",
        }}
      >
        <SelectBankModal isModalOpen={setIsModalOpen} />
      </Modal>
      {error}
      {
        error ? (
          <BodyContent />
        ) : countProperties(chartsData.data) !== 0 ? (
          <BodyContent />
        ) : (
          <div
            className="body-content"
            style={{
              height: detail.software
                ? "calc( 100% - 120px )"
                : "calc( 100% - 70px )",
            }}
          >
            {stringFa.no_exist_charts}
          </div>
        )
      }
      {/* {
        detail.software || detail.company || detail.holding ? 
       : (
            <div
              className="body-content"
              style={{
                height: detail.software
                  ? "calc( 100% - 120px )"
                  : "calc( 100% - 70px )",
              }}
            >
              {stringFa.clicked_software_to_see_charts}
            </div>
          )} */}
    </div>
  );
};

export default BodyViewContainer;
