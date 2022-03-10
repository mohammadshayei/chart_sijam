import { useState } from 'react';
import './BodyContentUserAccessChart.scss'
import { useTheme } from '../../../../../styles/ThemeProvider';
import { IoIosSearch } from "react-icons/io";
import Input from '../../../../../component/UI/Input/Input';
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import { useSelector } from 'react-redux';
import UserItem from './UserItem/UserItem';

const BodyContentUserAccessChart = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const holdingDetail = useSelector((state) => state.holdingDetail);
    const userId = useSelector((state) => state.auth);

    return (
        <div className="user-access-chart-container">
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
                </div>}
            </div>
        </div>
    )
}

export default BodyContentUserAccessChart
