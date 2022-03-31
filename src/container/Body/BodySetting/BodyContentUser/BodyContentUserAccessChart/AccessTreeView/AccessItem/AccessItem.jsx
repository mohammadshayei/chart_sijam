
import { useEffect, useState } from 'react';
import CheckBox from '../../../../../../../component/UI/CheckBox/CheckBox'
import { useTheme } from '../../../../../../../styles/ThemeProvider';
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

import './AccessItem.scss'
const AccessItem = ({ name, selected, opened, parents, onChange, onClick, hasChild }) => {
    const [isNested, setIsNested] = useState(false)
    useEffect(() => {
        if (hasChild) setIsNested(hasChild())
    }, [hasChild])

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div
            className="access-item-warpper"
            style={{
                paddingRight: `${parents.length * 20}px`,
            }}
        >
            <CheckBox checked={selected} onChange={onChange} />
            <div
                onClick={onClick}
                className='access-content'
                style={{
                    // backgroundColor: theme.border_color
                }}
            >
                <p>{name}</p>
                {isNested &&
                    <ArrowBackIosRoundedIcon
                        className={`${opened ? "DropDownOpenRotate" : ""}`}
                        style={{
                            width: "13px",
                            height: "13px",
                            color: theme.arrows_color
                        }}
                    />
                }
            </div>
        </div>
    )
}

export default AccessItem