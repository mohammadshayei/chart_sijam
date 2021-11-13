import React from 'react'
import './CustomSelect.scss'
const CustomSelect = (props) => {
    return (
        <div className='custom-select-container' style={{ ...props.style }}>
            {
                props.title &&
                <p>{props.title}</p>
            }
            <select style={{...props.selectStyle}} value={props.selectedItem} onChange={props.onSelectChangeHandler}>
                {props.items && props.items.map((option) => (
                    props.path ?
                        <option key={option[props.path][props.keyField]}
                            value={option[props.path][props.valueField]}>
                            {option[props.path][props.valueField]}
                        </option>
                        :
                        <option key={option[props.keyField]}
                            value={option[props.valueField]}>
                            {option[props.valueField]}
                        </option>

                ))}
            </select>
        </div>
    )
}

export default CustomSelect
