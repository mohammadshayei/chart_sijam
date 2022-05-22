import Input from "../../../../component/UI/Input/Input";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import StyledButton from "../../../../component/UI/Button/StyledButton";
import { MdCancel } from "react-icons/md";
import { useTheme } from "../../../../styles/ThemeProvider";
import "./Filter.scss";
import { useState } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/purple.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

const PeriodFieldFilter = (props) => {
  const [dateState, setdateState] = useState({
    start: false,
    end: false
  })
  const onOpen = (start) => {
    setdateState(state => {
      return {
        ...state,
        start: start ? true : state.start,
        end: !start ? true : state.end,
      }
    })
  }
  const onClose = (start) => {
    setdateState(state => {
      return {
        ...state,
        start: start ? false : state.start,
        end: !start ? false : state.end,
      }
    })
  }
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const onChange = (date, format = "YYYY/MM/DD", start) => {
    let object = { date, format }
    props.onFilterValueChange(new DateObject(object).convert(persian, persian_en).format(), props.index, start)
  }
  return (
    <div className="field-filter-wrapper">
      <StyledButton
        onClick={() => props.remove(props.index)}
        ButtonStyle={{ margin: "0.3rem 0 0.3rem 0.3rem" }}
        hover={
          themeState.isDark ? theme.surface_1dp : theme.background_color
        }
      >
        <MdCancel />
      </StyledButton>
      {
        props.field.type === 'عدد' ?
          <>
            <Input
              inputContainer={{ width: "calc(100% - .5rem)" }}
              elementType="input"
              onChange={(e) => props.onFilterValueChange(e.target.value, props.index, true)}
              isOk={true}
              value={props.filterValues[props.index].content.value.start}
              title={props.field.name}
              style={{ padding: '0 10px' }}
              config={{ placeholder: 'از', dir: "ltr" }}
            // config={{ placeholder: 'از', pattern: props.field.type === 'عدد' ? "[0-9]*" : "" }}
            />
            <Input
              // inputContainer={{ width: "100%", marginRight: "1rem" }}
              inputContainer={{ width: "calc(100% - 1rem)", marginRight: ".5rem" }}
              elementType="input"
              onChange={(e) => props.onFilterValueChange(e.target.value, props.index, false)}
              isOk={true}
              value={props.filterValues[props.index].content.value.end}
              config={{ placeholder: 'تا', dir: "ltr" }}
              style={{ padding: '0 10px' }}

            />
          </>
          :
          <>
            <DatePicker
              className={`${themeState.isDark ? "bg-dark" : ""} date-picker-wrapper`}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              fixMainPosition={true}
              editable={false}
              onOpen={() => onOpen(true)}
              onClose={() => onClose(true)}
              portal
              placeholder="از"
              style={{
                background: themeState.isDark
                  ? theme.surface_1dp
                  : theme.surface,
                color: theme.on_background,
                borderColor: (dateState.start ? theme.primary : theme.darken_border_color),
                padding: '.85rem 10px',
                marginBottom: ".4rem",
                width: '100%',

                fontSize: "1rem"

              }}
              onChange={(e, f) => onChange(e, f, true)}

            />
            <DatePicker
              className={`${themeState.isDark ? "bg-dark" : ""}`}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              fixMainPosition={true}
              editable={false}
              onOpen={() => onOpen(false)}
              onClose={() => onClose(false)}
              portal
              placeholder="تا"
              style={{
                background: themeState.isDark
                  ? theme.surface_1dp
                  : theme.surface,
                color: theme.on_background,
                borderColor: (dateState.start ? theme.primary : theme.darken_border_color),
                padding: '.85rem 10px',
                marginBottom: ".4rem",
                width: 'calc(100% - .5rem)',
                fontSize: "1rem",
              }}
              onChange={(e, f) => onChange(e, f, false)}
            />
          </>
      }

      <CheckBox
        checked={props.filterValues[props.index].content.not}
        onChange={props.onNotValueChange}
        style={{ fontSize: "0.7rem", marginRight: "1rem", marginBottom: "0.5rem" }}
        checkmarkStyle={{ width: "15px", height: "15px" }}
      >نقیض
      </CheckBox>
    </div>
  )
}

export default PeriodFieldFilter