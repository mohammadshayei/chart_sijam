import { useState } from 'react';
import './BodyContentUserAccessChart.scss'
import { useTheme } from '../../../../../styles/ThemeProvider';
import { IoIosSearch } from "react-icons/io";
import Input from '../../../../../component/UI/Input/Input';
import { stringFa } from '../../../../../assets/strings/stringFaCollection';

const BodyContentUserAccessChart = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [loading, setLoading] = useState(false);

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
                </div>
            </div>
        </div>
    )
}

export default BodyContentUserAccessChart
