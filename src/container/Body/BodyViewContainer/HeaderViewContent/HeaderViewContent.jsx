import React, { useEffect, useState } from 'react'
import './HeaderViewContent.scss'
import { BsThreeDots } from 'react-icons/bs'
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { useTheme } from '../../../../styles/ThemeProvider';
import { ripple } from '../../../../assets/config/ripple';
import Button from "../../../../component/UI/Button/Button.jsx";
import { stringFa } from '../../../../assets/strings/stringFaCollection';
import { AiOutlineUsergroupDelete } from 'react-icons/ai'
import GroupButton from '../../../../component/UI/GroupButton/GroupButton';
import ToolsContainer from './ToolsContainer/ToolsContainer';
import { useSelector } from 'react-redux';
const HeaderViewContent = (props) => {
    const [isFav, setIsFav] = useState(false)
    const [editable, setEditable] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const chartsData = useSelector((state) => state.chart);
    const user = useSelector((state) => state.auth.user);


    const onStarClickHandler = (e) => {
        ripple(e, theme.ripple_star_color);
        setIsFav(!isFav);
    };
    const starStyles = {
        color: theme.star_color,
        cursor: "pointer",
        fontSize: "30px",
    };
    const countProperties = (obj) => {
        var count = 0;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) ++count;
        }
        return count;
    };
    useEffect(() => {
        if (user && user.is_fekrafzar) setEditable(true)
        else setEditable(false)
    }, [user])
    return (
        <div className='header-view-content-container' >
            <div className="header-view-left-section">
                <BsThreeDots style={{ cursor: "pointer", fontSize: "1.2rem" }} />
                {
                    countProperties(chartsData.data) !== 0 &&
                    <div className='star-container' onClick={onStarClickHandler}>
                        {isFav ? (
                            <StarRoundedIcon style={starStyles} />
                        ) : (
                            <StarBorderRoundedIcon style={starStyles} />
                        )}
                    </div>
                }

                {
                    // some condition to show button share but i dont know 
                    false && <Button
                        ButtonStyle={{
                            backgroundColor: theme.primary,
                            fontWeight: 400,
                            fontSize: "12px",
                            color: theme.on_primary,
                            padding: "0 .5rem",
                            height: "2rem",
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    // onClick={}
                    >
                        <p style={{ whiteSpace: "nowrap" }}>
                            {stringFa.share}
                        </p>
                        <AiOutlineUsergroupDelete style={{ fontSize: "1rem", marginLeft: '.2rem' }} />
                    </Button>
                }

            </div>

            <div className="header-view-middle-section">
                {
                    editable &&
                    <GroupButton buttonNames={["نمایش", "ویرایش"]} />
                }
            </div>
            <div className="header-view-right-section">
                <ToolsContainer
                    chartCount={countProperties(chartsData.data)}
                    setIsModalOpen={props.setIsModalOpen} />

            </div>

        </div>
    )
}

export default HeaderViewContent
