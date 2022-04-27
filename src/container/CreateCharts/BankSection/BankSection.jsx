import { useEffect, useState } from "react";
import "./BankSection.scss";
import EditTitle from "../../../component/UI/EditTitle/EditTitle";
import { useTheme } from "../../../styles/ThemeProvider";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useSelector } from "react-redux";

const BankSection = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [data, setData] = useState([]);
  const takenData = useSelector((state) => state.addChart);

  useEffect(() => {
    setData(takenData.data)
  }, [takenData]);

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
            {data.length > 0 &&
              <tr className="tabe-bank-thead-tr"
                style={{
                  background: theme.secondary,
                  color: theme.on_secondary,
                }}>
                {Object.entries(data[0]).map(([key, value]) => (
                  <th key={key} style={{ borderColor: theme.darken_border_color }}>
                    {key}
                  </th>))}
              </tr>}
          </thead>
          <tbody>
            {data.length > 0 ?
              data.map((v, i) => (
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
