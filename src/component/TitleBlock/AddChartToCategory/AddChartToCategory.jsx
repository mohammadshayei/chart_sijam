import StyledButton from '../../UI/Button/StyledButton'
import './AddChartToCategory.scss'
import { VscClose } from "react-icons/vsc";
import { stringFa } from '../../../assets/strings/stringFaCollection';
import { useTheme } from '../../../styles/ThemeProvider';
import Input from '../../UI/Input/Input';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import Button from '../../UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '../../UI/CheckBox/CheckBox';
import { addRemoveChartToCategories, createCategory } from '../../../api/home';
import ErrorDialog from '../../UI/Error/ErrorDialog';
import * as HoldingActions from "../../../store/actions/holdingDetail";

const AddChartToCategory = ({ chartId, close }) => {
    const [value, setValue] = useState('')
    const [order, setOrder] = useState([])
    const [hover, setHover] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { userId, token } = useSelector((state) => state.auth);
    const { selectedHolding } = useSelector((state) => state.holdingDetail);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const dispatch = useDispatch();
    const createDeleteCategory = (payload) => {
        dispatch(HoldingActions.deleteCreateCategory(payload));
    };
    const addChartToCategories = (payload) => {
        dispatch(HoldingActions.addChartToCategories(payload));
    };
    const onChange = e => {
        setValue(e.target.value)
    }
    const onCreateCategory = async () => {
        if (value.length === 0)
            return;
        setLoading(true)
        const result = await createCategory({ name: value, holdingId: selectedHolding.holdingId, userId }, token)
        setError(
            <ErrorDialog success={result.success} onClose={() => setError(false)}>{result.success ? result.data.message : result.error}</ErrorDialog>
        )
        if (result.success) {
            createDeleteCategory({ data: { _id: result.data.category._id, name: result.data.category.name }, mode: 'create' })
            setValue('')
        }

        setLoading(false)
    }
    const onChangeItem = async (id) => {
        // console.log(id, status)
        //locally change
        let updatedOrder = [...order]
        let findedIndex = updatedOrder.findIndex(item => item._id === id)
        updatedOrder[findedIndex].checked = !updatedOrder[findedIndex].checked;
        setOrder(updatedOrder)
        //send api to change in db

    }

    const onAddRemoveChartsToCategories = async () => {
        //api
        setLoading(true)
        const result = await addRemoveChartToCategories({
            categoriesList: order.map(item => {
                return {
                    id: item._id,
                    checked: item.checked
                }
            }), chartId
        }, token)
        setError(
            <ErrorDialog success={result.success} onClose={() => setError(false)}>{result.success ? result.data.message : result.error}</ErrorDialog>
        )
        //local
        if (result.success) {
            addChartToCategories({
                categoriesList: order.map(item => {
                    return {
                        _id: item._id,
                        checked: item.checked
                    }
                }), chartId
            })
        }
        setLoading(false)
        close()
    }

    useEffect(() => {
        if (selectedHolding && selectedHolding.categories.length > 0) {
            let updatedOrder = selectedHolding.categories.filter(item => item.category.name !== 'fave').map(item => {
                return {
                    _id: item.category._id,
                    name: item.category.name,
                    checked: item.category.charts.findIndex(item => item.chart === chartId) > -1,
                }
            })
            setOrder(updatedOrder)
        }
    }, [selectedHolding])


    return (
        <div className='add-chart-to-category-wrapper'>
            {error}
            <div className="close-wrapper">
                <StyledButton
                    ButtonStyle={{
                        fontSize: "1.3rem",
                        padding: "4px",
                    }}
                    onClick={close}
                >
                    <VscClose />
                </StyledButton>
                <p>
                    {stringFa.add_to_list}
                </p>
            </div>
            <div style={{
                border: `1px solid ${theme.darken_border_color}`,
                marginTop: "1rem"
            }} />
            <p className='title'>{stringFa.which_list_do_you_add_the_product}</p>

            <div className="list-wrapper">
                <div className='category-list'>
                    {
                        order.length > 0 && order.map(category =>
                            <div
                                className='item'
                                onMouseEnter={() => { setHover(category._id) }}
                                onMouseLeave={() => { setHover('') }}
                                style={{
                                    backgroundColor: hover === category._id ? theme.border_color : '',
                                }}
                                key={category._id}
                                onClick={() => onChangeItem(category._id)}
                            >
                                <CheckBox checked={category.checked} onChange={() => onChangeItem(category._id)} />
                                <p>{category.name}</p>
                            </div>
                        )
                    }
                </div>
                <div className='add-list'
                // style={{ borderColor: theme.border_color }}
                >
                    <Input
                        elementType="input"
                        value={value}
                        isOk={true}
                        onChange={onChange}
                        inputContainer={{ width: '100%' }}
                        config={
                            {
                                placeholder: stringFa.enter_list_name
                            }
                        }
                    />
                    <StyledButton
                        onClick={onCreateCategory}
                        ButtonStyle={{ width: "100%", padding: "0", marginTop: "1rem" }}
                        hover={
                            themeState.isDark ? theme.surface_12dp : theme.background_color
                        }
                    >
                        <div className="button-text">
                            {stringFa.create_list}
                            <div className="button-icon" style={{ color: theme.primary }}>
                                <FaPlusCircle />
                            </div>
                        </div>
                    </StyledButton>
                </div>
            </div>
            <div className='actions'>
                <Button
                    ButtonStyle={{
                        padding: ".1rem 1rem",
                        marginRight: "1rem"
                    }}
                    onClick={onAddRemoveChartsToCategories}
                >
                    {stringFa.confirm}
                </Button>
                <Button
                    ButtonStyle={{
                        padding: ".1rem 1rem"
                    }}
                    onClick={()=>close()}
                >
                    {stringFa.cancel}
                </Button>

            </div>

        </div>
    )
}

export default AddChartToCategory