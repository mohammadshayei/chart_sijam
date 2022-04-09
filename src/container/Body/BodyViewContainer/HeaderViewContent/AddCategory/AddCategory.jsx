import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCategory, deleteCategory } from "../../../../../api/home"
import { stringFa } from "../../../../../assets/strings/stringFaCollection"
import Button from "../../../../../component/UI/Button/Button"
import StyledButton from "../../../../../component/UI/Button/StyledButton"
import ErrorDialog from "../../../../../component/UI/Error/ErrorDialog"
import Input from "../../../../../component/UI/Input/Input"
import { useTheme } from "../../../../../styles/ThemeProvider"
import './AddCategory.scss'
import { VscClose } from "react-icons/vsc";
import * as HoldingActions from "../../../../../store/actions/holdingDetail";


const AddCategory = ({ close }) => {
    const [value, setValue] = useState('')
    const { userId, token } = useSelector((state) => state.auth);
    const { selectedHolding } = useSelector((state) => state.holdingDetail);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isValid, setIsValid] = useState(true)
    const [hover, setHover] = useState('')

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const dispatch = useDispatch();
    const createDeleteCategory = (payload) => {
        dispatch(HoldingActions.deleteCreateCategory(payload));
    };

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onCreateCategory = async () => {
        if (value.length === 0) {
            setIsValid(false)
            return;
        }
        setLoading(true)
        const result = await createCategory({ name: value, holdingId: selectedHolding.holdingId, userId }, token)
        setError(
            <ErrorDialog success={result.success} onClose={() => setError(false)}>{result.success ? result.data.message : result.error}</ErrorDialog>
        )
        if (result.success)
            createDeleteCategory({ data: { _id: result.data.category._id, name: result.data.category.name }, mode: 'create' })

        setLoading(false)

    }
    const onDeleteCategory = async (_id) => {
        setLoading(true)
        const result = await deleteCategory({ categoryId: _id, holdingId: selectedHolding.holdingId, userId }, token)
        setError(
            <ErrorDialog success={result.success} onClose={() => setError(false)}>{result.success ? result.data : result.error}</ErrorDialog>
        )
        if (result.success)
            createDeleteCategory({ data: { _id }, mode: 'delete' })
        setLoading(false)
    }
    return (
        <div className="add-category-wrapper">
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
            </div>
            <p >{stringFa.list}</p>
            <div className="view-category-list">
                {
                    selectedHolding.categories.filter(item => item.category.name !== 'fave').map(item =>
                        <div
                            key={item.category._id}
                            className="item"
                            onMouseEnter={() => { setHover(item.category._id) }}
                            onMouseLeave={() => { setHover('') }}
                            style={{
                                backgroundColor: hover === item.category._id ? theme.border_color : '',
                            }}
                        >
                            <StyledButton
                                ButtonStyle={{
                                    fontSize: "1rem",
                                    color: "rgb(140, 140, 140)",
                                }}
                                onClick={() => { onDeleteCategory(item.category._id) }}
                            >
                                <VscClose />
                            </StyledButton>
                            <p>{item.category.name}</p>

                        </div>
                    )
                }
            </div>

            <p >{stringFa.category_name}</p>
            <Input
                elementType="input"
                isOk={isValid}
                value={value}
                onChange={onChange}
            />
            <div className="action-wrapper">
                <Button
                    ButtonStyle={{
                        padding: ".1rem 1rem"
                    }}
                    onClick={onCreateCategory}
                    disabled={value.length === 0}
                >
                    {stringFa.add}
                </Button>
            </div>
        </div >
    )
}

export default AddCategory