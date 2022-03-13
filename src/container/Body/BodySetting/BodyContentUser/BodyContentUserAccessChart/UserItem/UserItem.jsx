import { useState } from "react";
import { baseUrl } from "../../../../../../constants/Config";
import { useTheme } from "../../../../../../styles/ThemeProvider";
import "./UserItem.scss"

const UserItem = ({ data, selected, setSelected }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [hover, setHover] = useState(false);

    return <div className="user-item-box"
        tabIndex="0"
        style={{
            background: selected ?
                data.user._id === selected._id ?
                    `linear-gradient(120deg,${theme.primary},${theme.secondary})` :
                    hover ? theme.darken_border_color : theme.border_color :
                hover ? theme.darken_border_color : theme.border_color,
            color: selected ? data.user._id === selected._id ? theme.on_primary : theme.on_background : theme.on_background
        }}
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => setSelected(data.user)}
    >
        <img
            src={`${baseUrl}images/${data.user.image !== '' ? data.user.image : 'avatar'}.png`}
            alt="avatar"
        />
        {data.user.username}
    </div>;
};

export default UserItem;
