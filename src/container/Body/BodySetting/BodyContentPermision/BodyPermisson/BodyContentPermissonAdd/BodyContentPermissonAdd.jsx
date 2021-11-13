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
import CustomSelect from '../../../../../../component/UI/CustomSelect/CustomSelect'

const BodyContentPermissonAdd = () => {
    const [multiHolding, setMultiHolding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedHolding, setSelectedHolding] = useState('')
    const [fethedHoldings, setFethedHoldings] = useState([])
    const [msg, setMsg] = useState(null)

    const [holdingDetail, setHoldingDetail] =
        useState({
            name: '',
            image: '',
            id: ''
        })
    const [label, setLabel] = useState({
        name: '',
        holdingId: '',
        settingCode: '',
        chartCode: "",
        labelCode: '',
        userCode: '',
    })
    const [order, setOrder] = useState(
        {
            custom: {
                title: 'صفحه شخصی سازی',
                checked: false
            },
            settingUser: {
                title: 'صفحه کاربران',
                checked: false
            },
            permission: {
                title: 'صفحه دسترسی ها',
                checked: false
            },
            createChart: {
                title: 'ایجاد نمودار',
                checked: false
            },
            editChart: {
                title: 'تغییر نمودار',
                checked: false
            },
            createLabel: {
                title: 'ایجاد برچسب',
                checked: false
            },
            editLabel: {
                title: 'تغییر برچسب',
                checked: false
            },
            createUser: {
                title: 'ایجاد کاربر',
                checked: false
            },
            editUser: {
                title: 'تغییر کاربر',
                checked: false
            },
            serachUser: {
                title: 'جستوجو کاربر',
                checked: false
            },
            deleteUser: {
                title: 'حذف کاربر',
                checked: false
            }
        }
    )

    const [editable, setEditable] = useState(false)
    const [inputError, setInputError] = useState(false)

    const ref = useRef()
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if (user && user.is_fekrafzar) {
            setMultiHolding(true)
        } else {
            setMultiHolding(false)
        }
    }, [user])
    const onSelectChangeHandler = e => {
        setSelectedHolding(e.target.value)
        const holding = fethedHoldings.find(item => item.name === e.target.value)
        setHoldingDetail({
            name: holding.name,
            image: holding.image,
            id: holding.id,
        })

    }
    useEffect(async () => {
        if (multiHolding) {
            setLoading(true);
            const resultFetchingHoldings = await axios.get(`${baseUrl}api/get_holdings`, { headers: { 'auth-token': token } });
            setFethedHoldings(resultFetchingHoldings.data.message.result)
            setHoldingDetail({
                name: resultFetchingHoldings.data.message.result[0].name,
                image: resultFetchingHoldings.data.message.result[0].image,
                id: resultFetchingHoldings.data.message.result[0].id,
            })
            setLoading(false);

        }
    }, [multiHolding])
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
            holdingId: holdingDetail.id,
            settingCode: `${order.custom.checked ? '1' : '0'}${order.settingUser.checked ? '1' : '0'}${order.permission.checked ? '1' : '0'}`,
            chartCode: `${order.createChart.checked ? '1' : '0'}${order.editChart.checked ? '1' : '0'}`,
            labelCode: `${order.createLabel.checked ? '1' : '0'}${order.editLabel.checked ? '1' : '0'}`,
            userCode: `${order.createUser.checked ? '1' : '0'}${order.editUser.checked ? '1' : '0'}${order.serachUser.checked ? '1' : '0'}${order.deleteUser.checked ? '1' : '0'}`,
        }
        const resultReq = await axios.post(
            `${baseUrl}api/create_label`, payload, { headers: { 'auth-token': token } });
        console.log(resultReq.data)
        setMsg(
            <ErrorDialog
                onClose={setMsg}
                success={resultReq.data.success}
            >{resultReq.data.success ? stringFa.success_save : resultReq.data.message.error}</ErrorDialog>
        );
        setLoading(false)

        // name: '',
        // holdingId: '',
        // settingCode: '',
        // chartCode: "",
        // labelCode: '',
        // userCode: '',

    }
    return (
        <div className='body-content-permission-add-container'>
            {msg}
            {
                multiHolding &&
                <>
                    <CustomSelect
                        title={stringFa.select_holding}
                        selectedItem={selectedHolding}
                        items={fethedHoldings}
                        onSelectChangeHandler={onSelectChangeHandler}
                        style={{ marginBottom: "1rem" }}
                        keyField='code'
                        valueField='name'
                    />
                    <div className='seprator'
                        style={{ backgroundColor: theme.hover_button }}
                    />
                </>
            }
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
