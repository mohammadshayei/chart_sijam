import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../../../../../constants/Config'
import SelectHolding from '../../../BodyContentCustom/SelectHolding/SelectHolding'
import './BodyContentPermissonView.scss'
import { useTheme } from '../../../../../../styles/ThemeProvider'
import { stringFa } from '../../../../../../assets/strings/stringFaCollection'
import CheckBox from '../../../../../../component/UI/CheckBox/CheckBox'
import Loading from '../../../../../../component/UI/Loading/Loading'
const BodyContentPermissonView = () => {
    const [multiHolding, setMultiHolding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedHolding, setSelectedHolding] = useState('')
    const [fethedHoldings, setFethedHoldings] = useState([])
    const [holdingDetail, setHoldingDetail] =
        useState({
            name: '',
            image: '',
            id: ''
        })
    const [labels, setLabels] = useState(null)

    const order = [{
        title: 'صحفه شخصی سازی',
        path: ['setting', 'customization'],
    },
    {
        title: 'صحفه کاربران',
        path: ['setting', 'users'],
    },
    {
        title: 'صحفه دسترسی ها',
        path: ['setting', 'permissions'],
    },
    {
        title: 'ایجاد نمودار',
        path: ['chart', 'create'],
    },
    {
        title: 'تغییر نمودار',
        path: ['chart', 'edit'],
    },
    {
        title: 'ایجاد برچسب',
        path: ['label', 'create'],
    },
    {
        title: 'تغییر برچسب',
        path: ['label', 'edit'],
    },
    {
        title: 'ایجاد کاربر',
        path: ['user', 'create'],
    },
    {
        title: 'تغییر کاربر',
        path: ['user', 'edit'],
    },
    {
        title: 'جستوجو کاربر',
        path: ['user', 'search'],
    },
    {
        title: 'حذف کاربر',
        path: ['user', 'delete'],
    },
    ]


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

    useEffect(async () => {
        if (holdingDetail) {
            setLoading(true);
            const resultFetchingLabels = await axios.post
                (`${baseUrl}api/get_holding_labels`, { holdingId: holdingDetail.id }, { headers: { 'auth-token': token } });
            setLabels(resultFetchingLabels.data.labels)

            setLoading(false);
        }
    }, [holdingDetail])
    const trBodyStyle = {
        borderColor: '#dddddd',
        backgroundColor: theme.table_background,
    }
    return (
        <div className='body-content-permission-view-container'>

            {
                multiHolding &&
                <>
                    <SelectHolding
                        selectedHolding={selectedHolding}
                        fethedHoldings={fethedHoldings}
                        onSelectChangeHandler={onSelectChangeHandler}
                        style={{ marginBottom: "1rem" }}
                    />
                    <div className='seprator'
                        style={{ backgroundColor: theme.hover_button }}
                    />
                </>
            }
            <h4 className='permission-title'>
                {stringFa.permissions}
            </h4>
            {
                loading ?
                    <div className='loading-class'>
                        <Loading style={{ width: '150px', height: '150px' }} />
                    </div>
                    :
                    labels && labels.length > 0 &&
                    <div className='table-container'>
                        <table className='tabe-permissions'
                            style={{
                                boxShadow: `0 0 20px ${theme.hover}`
                            }}>
                            <thead>
                                <tr className='tabe-permissions-thead-tr'
                                    style={{
                                        backgroundColor: theme.primary,
                                        color: theme.on_primary
                                    }}
                                >
                                    <th>ویژگی</th>
                                    {
                                        labels.map(item =>
                                            <th>{item.label.name}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    order.map((v) =>
                                        <tr style={{ ...trBodyStyle }}>
                                            <td>{v.title}</td>
                                            {
                                                labels.map((item) =>
                                                    <td>
                                                        <CheckBox checked={item.label[v.path[0]][v.path[1]]} />
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>

            }

        </div >
    )
}

export default BodyContentPermissonView
