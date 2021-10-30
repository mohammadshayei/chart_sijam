import React from 'react'
import './CheckBox.scss'
const CheckBox = ({ checked, onChange }) => {
    return (
        <div className="timer-checkbox">
            <label className="container">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange && onChange(e)}
                ></input>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default CheckBox
