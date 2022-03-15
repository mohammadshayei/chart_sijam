import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { stringFa } from '../../../../../../assets/strings/stringFaCollection'
import { baseUrl } from '../../../../../../constants/Config'
import { useTheme } from '../../../../../../styles/ThemeProvider'
import './BodyContentPermissonAdd.scss'
import LabelItem from './LabelItem/LabelItem'
import ErrorDialog from '../../../../../../component/UI/Error/ErrorDialog'
import StyledButton from '../../../../../../component/UI/Button/StyledButton'

const BodyContentPermissonAdd = () => {
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState(null)
    const [label, setLabel] = useState({
        name: '',
        customization: false,
        users: false,
        permissions: false,
        chart: false,
        label: false,
        holdingId: '',
    })
    const [order, setOrder] = useState(
        {
            custom: {
                title: 'صفحه شخصی سازی',
                checked: false
            },
            user: {
                title: 'صفحه کاربران',
                checked: false
            },
            permission: {
                title: 'صفحه دسترسی ها',
                checked: false
            },
            chart: {
                title: 'نمودار',
                checked: false
            },
            label: {
                title: 'برچسب',
                checked: false
            },
        }
    )
    const [editable, setEditable] = useState(false)
    const [inputError, setInputError] = useState(false)

    const ref = useRef()
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const token = useSelector(state => state.auth.token)
    const { selectedHolding } = useSelector(state => state.holdingDetail)



    const setTitleHandler = (e) => {
        setInputError(null);
        if (e.type === "keydown") {
            if (e.key === "Enter") {
                setLabel(lbl => ({ ...lbl, name: e.target.value }))
                setEditable(false);
            }
        } else setLabel(lbl => ({ ...lbl, name: e.target.value }));
    };
    const onChange = (key) => {
        const updatedOrder = { ...order }
        const updatedItem = updatedOrder[key]
        updatedItem.checked = !updatedItem.checked
        updatedOrder[key] = updatedItem;
        setOrder(updatedOrder)
    }
    const onSaveLabel = async (e) => {
        if (label.name === '') {
            setMsg(
                <ErrorDialog
                    onClose={setMsg}
                    success={false}
                >{stringFa.enter_title}</ErrorDialog>
            );
        }
        setLoading(true)
        const payload = {
            name: label.name,
            holdingId: selectedHolding.holdingId,
            customization: order.custom.checked,
            users: order.user.checked,
            permissions: order.permission.checked,
            chart: order.chart.checked,
            label: order.label.checked,

        }
        const resultReq = await axios.post(
            `${baseUrl}api/create_label`, payload, { headers: { 'auth-token': token } });
        setMsg(
            <ErrorDialog
                onClose={setMsg}
                success={resultReq.data.success}
            >{resultReq.data.success ? stringFa.success_save : resultReq.data.message.error}</ErrorDialog>
        );
        setLoading(false)
    }
    return (
        <div className='body-content-permission-add-container'>
            {msg}
            <div className='body-content-permission-add-get-value-container'>
                <div
                    className="editable-component"
                    ref={ref}
                    onClick={() => {
                        setEditable(true);
                    }}
                >
                    {editable ? (
                        <input
                            className="editable-input"
                            dir="rtl"
                            placeholder={stringFa.title}
                            value={label.name}
                            onChange={setTitleHandler}
                            onKeyDown={setTitleHandler}
                            style={{ borderColor: inputError ? "red" : "" }}
                        />
                    ) : (
                        <div className="text-component" dir="rtl">
                            <span>
                                {label.name
                                    ? label.name
                                    : stringFa.title}
                            </span>
                        </div>
                    )}
                </div>

                <div className='label-items-container'>
                    {
                        Object.entries(order).map(([k, v]) => {
                            return (
                                <LabelItem
                                    key={k}
                                    title={v.title}
                                    checked={v.checked}
                                    onChange={() => onChange(k)}
                                />
                            )
                        })
                    }
                </div>
                <div className='body-content-permission-add-button-container'>
                    <StyledButton
                        onClick={onSaveLabel}
                        ButtonStyle={{
                            backgroundColor: theme.primary,
                            fontWeight: 400,
                            fontSize: "1rem",
                            color: theme.on_primary,
                            padding: '.2rem 3rem',
                            height: '2.4rem'
                        }}
                        hover={
                            themeState.isDark ? theme.surface_12dp : theme.background_color
                        }
                    >
                        {stringFa.save}

                    </StyledButton>
                </div>
            </div>

        </div>
    )
}

export default BodyContentPermissonAdd
