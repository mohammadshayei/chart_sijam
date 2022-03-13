import { useEffect, useState } from 'react';
import './BodyContentUserAccessChart.scss'
import { useTheme } from '../../../../../styles/ThemeProvider';
import { IoIosSearch } from "react-icons/io";
import Input from '../../../../../component/UI/Input/Input';
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import { useSelector } from 'react-redux';
import UserItem from './UserItem/UserItem';
import ErrorDialog from '../../../../../component/UI/Error/ErrorDialog';
import SkeletonTreeView from '../../../../../component/Skeletons/SkeletonTreeView';
import { baseUrl } from '../../../../../constants/Config';
import axios from 'axios';
import AccessTreeView from './AccessTreeView/AccessTreeView';

const BodyContentUserAccessChart = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userAccess, setUserAccess] = useState(null);


    const holdingDetail = useSelector((state) => state.holdingDetail);
    const token = useSelector((state) => state.auth.token);

    useEffect(async () => {
        if (!selectedUser) return;
        const paylaod = {
            holdingId: holdingDetail.id,
            userId: selectedUser._id,
        };
        setLoading(true)
        try {
            setError(null)
            const resultGetAccessEmployee = await axios.post(
                `${baseUrl}api/get_access_employee`,
                paylaod,
                { headers: { "auth-token": token } }
            );
            if (resultGetAccessEmployee.data.success) {
                setUserAccess(resultGetAccessEmployee.data.result.data);
            }
            else
                setError(
                    <ErrorDialog onClose={setError}>{resultGetAccessEmployee.data.result.message}</ErrorDialog>
                )
        } catch (error) {
            setError(
                <ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>
            )
        }
        setLoading(false)
    }, [selectedUser]);


    return (
        <div className="user-access-chart-container">
            {error}
            <div className="users-selector-section">
                <div className="select-user-input-wrapper">
                    <div className="input-title">{stringFa.user_name}</div>
                    <div className="input-and-search-icon">
                        <Input
                            elementType="input"
                            config={{
                                placeholder: stringFa.search,
                            }}
                            isOk={true}
                        ></Input>
                        <div className="search-icon">
                            <IoIosSearch size="1.5em" color={theme.darken_border_color} />
                        </div>
                    </div>
                    <div className="users-list-container">
                        {holdingDetail.employees &&
                            holdingDetail.employees.length > 0 &&
                            holdingDetail.employees.map((employee) => (
                                <UserItem
                                    key={employee.user._id}
                                    data={employee}
                                    selected={selectedUser}
                                    setSelected={setSelectedUser}
                                />
                            ))}
                    </div>
                </div>
                {selectedUser && <div className="chart-access">
                    <div className="selected-user-access-title">
                        دسترسی های
                        <p className="selected-user"
                            style={{ color: theme.primary }}
                        >{selectedUser.username}</p>
                    </div>
                    <div className="selected-user-access-body">
                        {loading ?
                            <SkeletonTreeView />
                            :
                            userAccess && <AccessTreeView items={userAccess} />
                        }
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BodyContentUserAccessChart
