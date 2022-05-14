import { useEffect, useState } from "react";
import "./XAxisStep.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import FieldPicker from "./FieldPicker.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as addChartActions from "../../../../store/actions/addChart";
import { filterData } from "../../../../store/utility";

const XAxisStep = () => {
  const [pickers, setPickers] = useState([]);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const { metaData, emptyRequireds, data, chartData } = useSelector((state) => state.addChart);

  const dispatch = useDispatch();
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };

  const removeFieldPicker = (index) => {
    let updatedPickers = [];
    if (index < 0) return;
    if (index === pickers.length - 1)
      updatedPickers = pickers.filter(item => item.props.index !== index)
    else {
      let edited = false;
      pickers.forEach((item, indx) => {
        if (!edited) {
          if (item.props.index === index) edited = true;
          else updatedPickers.push(item)
        } else {
          updatedPickers.push({
            ...item,
            key: `${indx - 1}`,
            props: {
              ...item.props,
              index: indx - 1
            }
          })
        }

      })
    }
    setPickers(updatedPickers)
  };

  const addFieldPicker = () => {
    let updatedPickers = [...pickers,
    <FieldPicker key={`${pickers.length}`} index={pickers.length} removeFieldPicker={removeFieldPicker} />]
    setPickers(updatedPickers)
  };

  useEffect(() => {
    setPickers([
      <FieldPicker key="0" title={stringFa.column_type} index={0}
        removeFieldPicker={removeFieldPicker}
        error={emptyRequireds.includes("category")} />,
      <FieldPicker key="1" title={stringFa.values} index={1}
        removeFieldPicker={removeFieldPicker}
        error={emptyRequireds.includes("field1")} />,
    ])
  }, [emptyRequireds]);

  useEffect(() => {
    if (!metaData || !data) return;
    let rawData = data;
    if (metaData.filters.length > 0) {
      metaData.filters.forEach(filter => {
        if (filter.selected) {
          rawData = filterData(data, filter);
        }
      });
    }

    let updatedChartData = chartData;
    let chartDataUpdated = [];
    let chartOptionsUpdated = chartData.data.options;

    metaData.fields.forEach(field => {
      let fieldValues = [];
      rawData?.forEach(record => {
        for (const key in record) {
          if (record[key].fieldName === field.value)
            fieldValues = [...fieldValues, record[key].data];
        }
      });

      if (chartData.data.data.length === 0) {
        fieldValues.forEach((value) => {
          const fieldName =
            field.index === 0 ? "category" : `field${field.index}`;
          updatedChartData = {
            ...updatedChartData,
            data: {
              ...updatedChartData.data,
              data: [...updatedChartData.data.data, { [fieldName]: field.index > 0 ? parseInt(value) : value }],
              options:
                field.index > 0
                  ? {
                    ...updatedChartData.data.options,
                    fieldNames: {
                      ...updatedChartData.data.options.fieldNames,
                      [fieldName]: field.name,
                    },
                  }
                  : { ...updatedChartData.data.options },
            },
          };
        });
      } else {
        for (let index = 0; index < fieldValues.length; index++) {
          const fieldName =
            field.index === 0 ? "category" : `field${field.index}`;
          let found = false;
          for (const key in chartDataUpdated[index]) {
            if (key === fieldName) {
              chartDataUpdated[index][key] = field.index > 0 ? parseInt(fieldValues[index]) : fieldValues[index];
              found = true;
            }
          }
          if (!found) {
            chartDataUpdated[index] = {
              ...chartDataUpdated[index],
              [fieldName]: field.index > 0 ? parseInt(fieldValues[index]) : fieldValues[index],
            };
          }
          chartOptionsUpdated =
            field.index > 0
              ? {
                ...chartOptionsUpdated,
                fieldNames: {
                  ...chartOptionsUpdated.fieldNames,
                  [fieldName]: field.name,
                },
              }
              : { ...chartOptionsUpdated };
          updatedChartData = {
            ...updatedChartData,
            data: {
              ...updatedChartData.data,
              data: chartDataUpdated,
              options: chartOptionsUpdated,
            },
          };
        }
      }

    });

    setChartData(updatedChartData);

  }, [metaData]);


  return (
    <div className="settings-content">
      {pickers && pickers.map((picker) => picker)}
      <div className="x-axis-column">
        <div className="settings-multiple-item-footer">
          <StyledButton
            onClick={() => addFieldPicker()}
            hover={
              themeState.isDark ? theme.surface_1dp : theme.background_color
            }
          >
            {stringFa.add_value}
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default XAxisStep;
