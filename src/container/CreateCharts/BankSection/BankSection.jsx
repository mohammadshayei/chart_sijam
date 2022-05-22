import { useEffect, useState } from "react";
import "./BankSection.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useSelector } from "react-redux";
import { filterData } from "../../../store/utility";

const BankSection = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [tableData, setTableData] = useState([]);
  const { data, metaData, id } = useSelector((state) => state.addChart);
  const chartsData = useSelector((state) => state.chart);

  useEffect(() => {
    if (!data || !metaData || !chartsData.data[id]?.mergedData) return
    let newData = data
    if (chartsData.data[id]?.mergedData && Object.entries(chartsData.data[id].mergedData).length === 0)
      if (metaData.filters.length > 0) {
        metaData.filters.forEach(filter => {
          if (filter.selected) {
            newData = filterData(data, filter)
          }
        });
      }
    setTableData(newData)
  }, [data, metaData, chartsData.data[id]?.mergedData]);

  return (
    <div className="bank-section-container">
      {/* <div className="BankHeaderContainer">
        <EditTitle />
      </div> */}
      <div className="bank-table-container">
        <table className="table-bank"
          style={{
            color: theme.on_background,
          }}>
          <thead>
            {tableData.length > 0 &&
              <tr className="tabe-bank-thead-tr"
                style={{
                  background: theme.secondary,
                  color: theme.on_secondary,

                }}>
                {Object.entries(tableData[0]).map(([key, value]) => (
                  <th key={key} style={{ borderColor: theme.darken_border_color }}>
                    {key}
                  </th>))}
              </tr>}
          </thead>
          <tbody>
            {tableData.length > 0 ?
              tableData.map((v, i) => (
                <tr className="tabe-bank-tbody-tr" key={i}
                  style={{ background: i % 2 === 0 ? theme.background : theme.border_color }}
                >
                  {Object.entries(v).map(([kcell, vcell]) => (
                    <td key={kcell} style={{ borderColor: theme.darken_border_color }}>
                      {vcell.data}
                    </td>))}
                </tr>
              )) :
              <div style={{ color: theme.on_primary, marginTop: "1rem" }}>
                <p>{stringFa.data_not_found}</p>
              </div>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BankSection;
