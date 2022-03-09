import React from 'react'
import './CustomSelect.scss'
import { useTheme } from '../../../styles/ThemeProvider';

const CustomSelect = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='custom-select-container' style={{ ...props.style }}>
            {
                props.title &&
                <p style={{ ...props.titleStyle }}>{props.title}</p>
            }
            <select
                style={{
                    background: themeState.isDark
                        ? theme.surface_1dp
                        : theme.surface,
                    color: theme.on_background,
                    borderColor: theme.darken_border_color,
                    cursor: "pointer",
                    ...props.selectStyle
                }}
                value={props.selectedItem}
                onChange={props.onSelectChangeHandler}>
                {props.items && props.items.map((option) => (
                    props.path ?
                        <option key={option[props.path][props.keyField]}
                            value={option[props.path][props.valueField]}
                            style={{
                                backgroundColor: themeState.isDark
                                    ? "black"
                                    : "white",
                                color: theme.on_background,
                            }}>
                            {option[props.path][props.valueField]}
                        </option>
                        :
                        <option key={option[props.keyField]}
                            value={option[props.valueField]}
                            style={{
                                backgroundColor: themeState.isDark
                                    ? "black"
                                    : "white",
                                color: theme.on_background,
                            }}>
                            {option[props.valueField]}
                        </option>

                ))}
            </select>
        </div>
    )
}

export default CustomSelect
