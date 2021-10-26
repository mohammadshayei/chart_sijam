import React from 'react'
import './HeaderSetting.scss'
import HeaderSettingItem from './HeaderSettingItem/HeaderSettingItem'

const HeaderSetting = (props) => {
    return (
        <div className='header-setting-container'>
            {
                Object.entries(props.data).map(([k, v], index) => {
                    return (
                        <HeaderSettingItem
                            key={k}
                            onItemClickHandler={props.onClick}
                            selected={v.selected}
                            id={k}
                            title={v.title}
                            index={index}
                        />
                    )
                })
            }
        </div>
    )
}

export default HeaderSetting
