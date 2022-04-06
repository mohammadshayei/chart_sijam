import { useEffect, useState } from 'react';
import './BodyContentUserAccessChart.scss'
import { useTheme } from '../../../../../styles/ThemeProvider';
import { IoIosSearch } from "react-icons/io";
import Input from '../../../../../component/UI/Input/Input';
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from './UserItem/UserItem';
import ErrorDialog from '../../../../../component/UI/Error/ErrorDialog';
import SkeletonTreeView from '../../../../../component/Skeletons/SkeletonTreeView';
import { baseUrl } from '../../../../../constants/Config';
import axios from 'axios';
import AccessTreeView from './AccessTreeView/AccessTreeView';
import * as holdingActions from "../../../../../store/actions/holdingDetail";

const BodyContentUserAccessChart = ({ userIdUrl }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userAccess, setUserAccess] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const { selectedHolding, employees } = useSelector((state) => state.holdingDetail);
    const { token, userId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const setEmployees = (employees) => {
        dispatch(holdingActions.setEmployees(employees));
    };
    const onChangeSeachValue = e => {
        setSearchValue(e.target.value)
    }
    useEffect(() => {
        if (!userIdUrl || !employees) return;
        let selectedUser = employees.find(item => item.user._id === userIdUrl).user
        setSelectedUser(selectedUser)

    }, [userIdUrl, employees])

    useEffect(() => {
        if (!selectedUser) return;
        let controller = new AbortController();
        const paylaod = {
            holdingId: selectedHolding.holdingId,
            userId: selectedUser._id,
        };
        (async () => {
            try {
                setLoading(true)
                setError(null)
                const resultGetAccessEmployee = await axios.post(
                    `${baseUrl}api/get_access_employee`,
                    paylaod,
                    { headers: { "auth-token": token } }
                );
                if (resultGetAccessEmployee.data.success) {
                    setUserAccess(resultGetAccessEmployee.data.result);
                }
                else
                    setError(
                        <ErrorDialog onClose={setError}>{resultGetAccessEmployee.data.result.message}</ErrorDialog>
                    )
                controller = null
            } catch (e) {
                setError(
                    <ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>
                )
            }
            setLoading(false)

        })();
        return () => controller?.abort();
    }, [selectedUser]);

    useEffect(() => {
        if (!selectedHolding) return;
        let controller = new AbortController();
        (async () => {
            try {
                setLoading(true)
                const resultFetchingUsers = await axios.post(
                    `${baseUrl}api/get_employees`,
                    { id: selectedHolding.holdingId },
                    { headers: { "auth-token": token } }
                );
                if (resultFetchingUsers.data.success)
                    setEmployees({ employees: resultFetchingUsers.data.result.employees })
                else
                    setError(<ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>)
                setLoading(false)
                controller = null
            } catch (e) {
                setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
            }
        })();
        return () => controller?.abort();
    }, [selectedHolding]);
    useEffect(() => {
        if (!employees) return;
        let updatedEmployees = [...employees.filter(item => item.user._id !== userId && !item.user.is_fekrafzar)]
        if (searchValue !== '') {
            updatedEmployees = updatedEmployees.filter(item => new RegExp("^" + searchValue, 'i').test(item.user.username))
        }
        setFilteredEmployees(updatedEmployees)
    }, [employees, searchValue,])
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
                            value={searchValue}
                            onChange={onChangeSeachValue}
                        />
                        <div className="search-icon">
                            <IoIosSearch size="1.5em" color={theme.darken_border_color} />
                        </div>
                    </div>
                    <div className="users-list-container">
                        {filteredEmployees.length > 0 ?
                            filteredEmployees.map((employee) => (
                                <UserItem
                                    key={employee.user._id}
                                    data={employee}
                                    selected={selectedUser}
                                    setSelected={setSelectedUser}
                                />
                            )) :
                            <div style={{ color: theme.on_primary }}>
                                <p>{stringFa.no_user_exist}</p>
                            </div>
                        }
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
                            userAccess && <AccessTreeView userAccess={userAccess} userId={selectedUser._id} />
                        }
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BodyContentUserAccessChart
