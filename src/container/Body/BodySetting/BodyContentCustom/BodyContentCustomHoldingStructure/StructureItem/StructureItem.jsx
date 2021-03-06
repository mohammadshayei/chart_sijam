import './StructureItem.scss'
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useTheme } from '../../../../../../styles/ThemeProvider';
import doubleRingLoading from "../../../../../../assets/images/DoubleRing.svg"
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useRef, useState } from 'react';
import { stringFa } from '../../../../../../assets/strings/stringFaCollection';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from "../../../../../../store/actions/auth.js";
import Hint from '../../../../../../component/UI/Hint/Hint';

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
const StructureItem = ({ _id, name, opened, hovered, parents, edited, onChange, deleteItem, removeLoading, title, path, typeId, bankId, dataTime }) => {
    //_id, parents, key, value)
    const [titleValue, setTitleValue] = useState('')
    const [time, setTime] = useState('')
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { socket } = useSelector((state) => state.auth);

    const titleRef = useRef();

    useOnClickOutside(titleRef, () => {
        onChange(_id, parents, 'edited', true)
    });

    const dispatch = useDispatch();
    const changeItemTitle = (payload) => {
        dispatch(authActions.changeItemTitle(payload));
    };


    const styleIcon = {
        width: "17px",
        height: "17px",
    };
    let background = null, color = null;
    if (opened) {
        background = `linear-gradient(150deg,${theme.primary},${theme.secondary})`;
        color = theme.on_primary;
    }
    if (hovered) {
        if (!opened) {
            background = theme.hover;
            color = null;
        }
    }
    const saveTitle = () => {
        changeItemTitle({ path: [...path, _id], name: titleValue })
    }
    const setTitleHandler = (e) => {
        if (e.type === "keydown") {
            if (e.key === "Enter") {
                setTitleValue(e.target.value);
                onChange(_id, parents, 'edited', true)
                let payload = {
                    path: [...path, _id],
                    title: e.target.value
                }
                socket.emit('change_structure_item_title', payload)
                saveTitle()
                // saveCustomTitle()
            } else if (e.key === "Escape") {
                onChange(_id, parents, 'edited', true)
            }
        } else setTitleValue(e.target.value);
    };
    useEffect(() => {
        let weekday = new Date(dataTime).toLocaleString("fa-IR", {
            weekday: "long",
        });
        let day = new Date(dataTime).toLocaleString("fa-IR", {
            day: "numeric",
        });
        let month = new Date(dataTime).toLocaleString("fa-IR", {
            month: "long",
        });
        let year_Time = new Date(dataTime).toLocaleString(
            "fa-IR",
            {
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }
        );
        const lastBankUpdate = `${weekday} - ${day} ${month} ${year_Time}`;
        setTime(lastBankUpdate);
    }, [dataTime]);
    return (
        <div
            className="structure-item-warpper"
            style={{}}
            onMouseEnter={() => { onChange(_id, parents, 'hovered', false) }}
            onMouseLeave={() => { onChange(_id, parents, 'hovered', true) }}
        >
            {
                (hovered || opened) &&
                <div className="remove-user-container">
                    {removeLoading ?
                        <img src={doubleRingLoading} alt="double-ring-loading-gif" />
                        :
                        <IoMdCloseCircle
                            className="remove-icon"
                            color={theme.error}
                            onClick={() => deleteItem(title, _id, parents)}
                        />
                    }
                </div>
            }
            <div
                className='structure-content'
                ref={titleRef}
                style={{
                    background,
                    color
                }}
                onClick={() => {
                    onChange(_id, parents, 'edited', edited)
                    setTitleValue(name)
                }}
            >
                {edited ? (
                    <input
                        className="editable-input"
                        dir="rtl"
                        placeholder={stringFa.title}
                        value={titleValue}
                        onChange={setTitleHandler}
                        autoFocus
                        onKeyDown={setTitleHandler}
                    />
                ) : (
                    <div className="text-component" dir="rtl">
                        <span>
                            {name}
                        </span>
                    </div>
                )}
            </div>
            {(hovered || opened) && title !== stringFa.banks &&
                <div className='open'>
                    <ArrowBackIosRoundedIcon
                        onClick={() => onChange(_id, parents, 'opened', opened)}
                        className='arrow-class'
                        style={{
                            color: opened ? theme.primary : theme.arrows_color,

                        }}
                    />
                </div>
            }
            {title === stringFa.banks && hovered && <Hint show={hovered} hint={`???????? : ${bankId} , ?????????? : ${typeId.substring(1, 4)} , ?????? : ${typeId[0] === '0' ? 'sm' : 'cl'} , ???????? : ${time}`} />}

        </div>
    )
}

export default StructureItem