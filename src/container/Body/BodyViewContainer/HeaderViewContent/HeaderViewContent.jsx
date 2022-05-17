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
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from "../../../../component/UI/DropDown/DropDown";
import Modal from '../../../../component/UI/Modal/Modal';
import AddCategory from './AddCategory/AddCategory';
import * as holdingActions from "../../../../store/actions/holdingDetail.js";
import * as detailActions from "../../../../store/actions/detail.js";

import { MdCancel } from "react-icons/md";
import { RiFilter2Fill, RiFilter2Line } from 'react-icons/ri'

const HeaderViewContent = (props) => {
    const [isFav, setIsFav] = useState(false)
    const [editable, setEditable] = useState(false)
    const [dropDown, setDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const chartsData = useSelector((state) => state.chart);
    // const { } = useSelector((state) => state.auth);
    const { selectedHolding, selectedCategory } = useSelector((state) => state.holdingDetail);
    const { unityFilter } = useSelector((state) => state.detail);


    const ref = useRef();

    const dispatch = useDispatch();

    const setCategory = (payload) => {
        dispatch(holdingActions.setCategory(payload));
    };
    const setUnityFilter = (payload) => {
        dispatch(detailActions.setUnityFilter(payload));
    };

    const onStarClickHandler = (e) => {
        ripple(e, theme.ripple_star_color);
        if (!isFav) {
            let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave').category
            if (!faveCategory) return;
            setCategory({ category: faveCategory })
        } else {
            setCategory({ category: null })
        }
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
        if (selectedHolding && selectedHolding.chart) setEditable(true)
        else setEditable(false)
    }, [selectedHolding])

    const onCategoryClickHandler = _id => {
        if (_id === 'add_category') {
            setShowModal(true)
        } else {

            let cat = selectedHolding.categories.find(item => item.category._id === _id).category

            // if (selectedCategory?._id === _id)
            //     setCategory({ category: null })
            // else
            setCategory({ category: cat })

            setDropDown(false)
        }
    }
    const onToggle = () => {
        setDropDown(!dropDown)
    }
    const onToggleUnityFilter = () => {
        setUnityFilter({ value: !unityFilter })

    }
    const closeModal = () => {
        setShowModal(false);
    };
    const deSelectCategory = () => {
        setCategory({ category: null })
    }
    useEffect(() => {
        if (!selectedCategory) {
            setIsFav(false)
            return;
        }
        let faveCategory = selectedHolding.categories.find(item => item.category.name === 'fave')
        if (faveCategory.category._id === selectedCategory._id)
            setIsFav(true)
        else {
            setIsFav(false)
        }
    }, [selectedCategory])
    return (
        <div className='header-view-content-container' >
            <div className="header-view-left-section" ref={ref}>
                <div className='three-dot'>
                    <BsThreeDots style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={onToggle} />
                </div>
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
                <div className='unity-filter' style={{ color: theme.primary }}>
                    {
                        unityFilter ?
                            <RiFilter2Fill style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={onToggleUnityFilter} /> :
                            <RiFilter2Line style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={onToggleUnityFilter} />
                    }
                </div>
                {selectedCategory && selectedCategory.name !== 'fave' &&
                    <div className="selected">
                        <div onClick={deSelectCategory} className="cancel" style={{ borderColor: theme.primary, color: theme.primary }} >
                            <MdCancel />
                            <p>{selectedCategory.name}</p>
                        </div>
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
