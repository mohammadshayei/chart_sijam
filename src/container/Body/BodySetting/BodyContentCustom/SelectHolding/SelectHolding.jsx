import React from 'react'
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import './SelectHolding.scss'
const SelectHolding = (props) => {
    return (
        <div className='select-holding-container' style={{...props.style}}>
            <p>{stringFa.select_holding}</p>
            <select value={props.selectedHolding} onChange={props.onSelectChangeHandler}>
                {props.fethedHoldings.map((option) => (
                    <option key={option.code} value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectHolding
