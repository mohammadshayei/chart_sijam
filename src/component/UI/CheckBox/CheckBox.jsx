import React from 'react'
import './CheckBox.scss'
const CheckBox = ({ checked }) => {
    return (
        <div className="timer-checkbox">
            <label className="container">
                <input
                    type="checkbox"
                    checked={checked}
                ></input>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default CheckBox
