import React, { useEffect, useRef, useState } from 'react'
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
import Dropdown from "../../../../component/UI/DropDown/DropDown";
import Modal from '../../../../component/UI/Modal/Modal';
import AddCategory from './AddCategory/AddCategory';

const HeaderViewContent = (props) => {
    const [isFav, setIsFav] = useState(false)
    const [editable, setEditable] = useState(false)
    const [dropDown, setDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const chartsData = useSelector((state) => state.chart);
    const user = useSelector((state) => state.auth.user);
    const { selectedHolding } = useSelector((state) => state.holdingDetail);

    const ref = useRef();


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
    const onCategoryClickHandler = _id => {
        if (_id === 'add_category') {
            setShowModal(true)
        } else {

        }
    }
    const onToggle = () => {
        setDropDown(!dropDown)
    }
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className='header-view-content-container' >
            <div className="header-view-left-section" ref={ref}>
                <BsThreeDots style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={onToggle} />
                {selectedHolding && dropDown && (
                    <Dropdown
                        divStyle={{
                            top: "5.45rem",
                            left: "2.45rem",
                        }}
                        items={selectedHolding.categories.filter(item => item.category.name !== 'fave').map(item => item.category)}
                        onClick={onCategoryClickHandler}
                        setDropDown={setDropDown}
                        divContainerRef={ref}
                        extraItems={[{ name: stringFa.edit_category, _id: "add_category", }]}
                    />
                )}
                {<Modal show={showModal} modalClosed={closeModal}
                    style={{ width: "fit-content" }}>
                    <AddCategory close={closeModal} />
                </Modal>}
                {
                    selectedHolding && selectedHolding.categories.findIndex(item => item.category.name === 'fave') > -1 &&
                    <div className='star-container' onClick={onStarClickHandler}>
                        {isFav ? (
                            <StarRoundedIcon style={starStyles} />
                        ) : (
                            <StarBorderRoundedIcon style={starStyles} />
                        )}
                    </div>
                }

                {
                    // for share categories to other employee
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
