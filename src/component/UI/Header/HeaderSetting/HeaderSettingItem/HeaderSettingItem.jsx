import React, { useEffect, useState } from 'react'
import './HeaderSettingItem.scss'
import { Link } from 'react-router-dom'
import { useTheme } from '../../../../../styles/ThemeProvider';

const HeaderSettingItem = (props) => {
    const [hover, setHover] = useState(false)
    const [style, setStyle] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onMouseEnter = e => {
        setHover(true)
    }
    const onMouseLeave = e => {
        setHover(false)
    }
    useEffect(() => {
        if (props.selected) {
            setStyle({
                borderColor: theme.primary
            })
        } else {
            setStyle({
                borderColor: theme.hover
            })
        }
    }, [props.selected])
    const body =
        <div
            className='header-setting-item-container'
            style={{
                backgroundColor: hover ? theme.hover_button : '',
                // borderColor: !props.selected ? 'red' : theme.primary,
                borderBottom: '2px solid',
                color: theme.on_background,
                ...style
            }}
            onClick={(e) => props.onItemClickHandler(e, props.id)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p>
                {props.title}
            </p>
        </div>
    return (
        <>
            {props.notLink ? body
                : <Link
                    to={{
                        pathname: `/view/setting`,
                        search: `?menu_item=${props.pageIndex}&s=${props.index + 1}`,
                    }}
                    style={{ textDecoration: "none", }}
                >
                    {body}
                </Link>}
        </>

    )
}

export default HeaderSettingItem
