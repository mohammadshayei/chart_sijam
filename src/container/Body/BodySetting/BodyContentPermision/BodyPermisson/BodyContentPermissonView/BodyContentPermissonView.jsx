import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../../../../../constants/Config'
import './BodyContentPermissonView.scss'
import { useTheme } from '../../../../../../styles/ThemeProvider'
import { stringFa } from '../../../../../../assets/strings/stringFaCollection'
import CheckBox from '../../../../../../component/UI/CheckBox/CheckBox'
import Loading from '../../../../../../component/UI/Loading/Loading'
const BodyContentPermissonView = () => {
    const [loading, setLoading] = useState(false)
    const [labels, setLabels] = useState(null)

    const token = useSelector(state => state.auth.token)
    const { selectedHolding } = useSelector(state => state.holdingDetail)

    const order = [{
        title: 'صفحه شخصی سازی',
        path: ['customization'],
    },
    {
        title: 'صفحه کاربران',
        path: ['users'],
    },
    {
        title: 'صفحه دسترسی ها',
        path: ['permissions'],
    },
    {
        title: 'نمودار',
        path: ['chart'],
    },
    {
        title: 'برچسب',
        path: ['label'],
    },
    {
        title: 'ساختار هلدینگ',
        path: ['structure'],
    },
    ]


    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useEffect(() => {
        let controller = new AbortController();
        if (!selectedHolding || !token) return;
        (async () => {
            try {
                setLoading(true);
                const resultFetchingLabels = await axios.post(
                    `${baseUrl}api/get_holding_labels`,
                    { holdingId: selectedHolding.holdingId },
                    { headers: { "auth-token": token } }
                );
                setLabels(resultFetchingLabels.data.labels);
                controller = null
                setLoading(false);

            } catch (e) {
            }
        })();
        return () => controller?.abort();
    }, [selectedHolding, token]);

    const trBodyStyle = {
        borderColor: theme.border_color,
        backgroundColor:
            themeState.isDark ?
                theme.surface_4dp :
                theme.surface,
    }

    return (
        <div className='body-content-permission-view-container'>
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
                    <div className='table-container'
                        style={{
                            boxShadow: `0 0 20px 
                                ${themeState.isDark ?
                                    theme.background_color :
                                    theme.border_color}`
                        }}
                    >
                        <table className='tabe-permissions'>
                            <thead>
                                <tr className='tabe-permissions-thead-tr'
                                    style={{
                                        backgroundColor: theme.primary,
                                        borderLeftColor: theme.background_color,
                                        color: theme.on_primary
                                    }}
                                >
                                    <th
                                        style={{
                                            borderLeftColor: theme.background_color,
                                        }}
                                    >ویژگی</th>
                                    {
                                        labels.map(item =>
                                            <th key={item.label._id}
                                                style={{
                                                    borderLeftColor: theme.background_color,
                                                }}
                                            >{item.label.name}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    order.map((v) =>
                                        <tr key={v.title} style={{
                                            borderBottomColor: theme.border_color,
                                            ...trBodyStyle
                                        }}>
                                            <td
                                                style={{
                                                    borderLeftColor: theme.background_color,
                                                }}
                                            >{v.title}</td>
                                            {
                                                labels.map((item) =>
                                                    <td key={item._id}
                                                        style={{
                                                            borderLeftColor: theme.background_color,
                                                        }}
                                                    >
                                                        <CheckBox checked={item.label[v.path[0]]} />
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
