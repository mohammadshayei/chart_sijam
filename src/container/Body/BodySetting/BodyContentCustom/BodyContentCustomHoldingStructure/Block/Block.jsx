import StructureItem from '../StructureItem/StructureItem'
import './Block.scss'
import { FaPlusCircle } from "react-icons/fa";
import { useTheme } from '../../../../../../styles/ThemeProvider';
import StyledButton from '../../../../../../component/UI/Button/StyledButton';
import { useEffect, useState } from 'react';
import Button from '../../../../../../component/UI/Button/Button';
import { stringFa } from '../../../../../../assets/strings/stringFaCollection';
import Input from '../../../../../../component/UI/Input/Input';

const Block = ({ data, title, hasChild, onChange, addItem, addLoading, deleteItem, removeLoading, parents }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [inputStatus, setInputStatus] = useState({
        code: {
            value: "",
            isOk: true,
        },
        name: {
            value: "",
            isOk: true,
        }
    })
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onChangeHandler = (e, key) => {
        let updatedInputStatus = { ...inputStatus }
        updatedInputStatus[key].value = e.target.value;
        if (key === 'code')
            updatedInputStatus.code.isOk = e.target.value.length < 3 ? false : isNaN(e.target.value) ? false : true
        else
            updatedInputStatus.name.isOk = e.target.value.length > 1
        setInputStatus(updatedInputStatus)
    };
    const toggleVisble = () => {
        setIsVisible(v => !v)
        let updatedInputStatus = { ...inputStatus }
        updatedInputStatus.code.value = ''
        updatedInputStatus.name.value = ''
        setInputStatus(updatedInputStatus)
        setDisabled(true)
    }

    const onCancle = () => {
        setIsVisible(false)
        let updatedInputStatus = { ...inputStatus }
        updatedInputStatus.code.value = ''
        updatedInputStatus.name.value = ''
        setDisabled(true)
        setInputStatus(updatedInputStatus)
    }
    const onAddItemHandler = () => {
        if (inputStatus.name.value.length === 0 || inputStatus.code.value.length === 0) return;
        addItem(title, inputStatus.name.value, inputStatus.code.value, parents)
        let updatedInputStatus = { ...inputStatus }
        updatedInputStatus.code.value = ''
        updatedInputStatus.name.value = ''
        setInputStatus(updatedInputStatus)

    }
    useEffect(() => {
        if (inputStatus.name.value.length === 0 || inputStatus.code.value.length === 0) return;
        let updatedDisabled = inputStatus.code.isOk && inputStatus.name.isOk ? false : true
        setDisabled(updatedDisabled)
    }, [inputStatus])
    return (
        <div className='block'>
            <div className="title">
                <p>{title}</p>
            </div>
            <div className="list-items">
                {data.map(info =>
                    <StructureItem
                        key={info._id}
                        bankId={info.bankId}
                        typeId={info.typeId}
                        dataTime={info.dataTime}
                        name={info.name}
                        parents={info.parents}
                        path={info.orgParents}
                        opened={info.opened}
                        edited={info.edited}
                        hovered={info.hovered}
                        _id={info._id}
                        // hasChild={() => hasChild(info)}
                        onChange={onChange}
                        deleteItem={deleteItem}
                        removeLoading={removeLoading}
                        title={title}
                    />
                )}
            </div>
            {
                title !== stringFa.banks &&
                <StyledButton
                    // onClick={onAddHandler}
                    className="button-icon"
                    ButtonStyle={{
                        width: "80%", margin: "1rem 10%",
                        color: theme.primary,

                    }}
                    onClick={toggleVisble}
                    hover={
                        themeState.isDark ? theme.surface_12dp : theme.border_color
                    }
                >
                    <FaPlusCircle className='icon' />
                </StyledButton>
            }

            {
                isVisible &&
                <div className='hide-section'>
                    <Input
                        elementType="input"
                        inputContainer={{ width: "100%", }}
                        isOk={inputStatus.name.isOk}
                        value={inputStatus.name.value}
                        config={{ placeholder: `نام ${title}` }}
                        onChange={(e) => onChangeHandler(e, 'name')}
                    />
                    <Input
                        elementType="input"
                        inputContainer={{ width: "100%", marginTop: "1rem" }}
                        isOk={inputStatus.code.isOk}
                        value={inputStatus.code.value}
                        config={{ placeholder: `کد ${title}` }}
                        onChange={(e) => onChangeHandler(e, 'code')}

                    />
                    <div className='action'>
                        <Button
                            ButtonStyle={{
                                backgroundColor: "gray",
                                flex: "0 0 auto",
                                fontWeight: 400,
                                fontSize: "0.9rem",
                                color: theme.on_primary,
                                marginBottom: "1rem",
                                height: "30px",

                            }}
                            onClick={onCancle}
                        >
                            {stringFa.cancel}
                        </Button>
                        <Button
                            ButtonStyle={{
                                backgroundColor: theme.primary,
                                flex: "0 0 auto",
                                fontWeight: 400,
                                fontSize: "1rem",
                                color: theme.on_primary,
                                marginBottom: "1rem",
                                marginRight: "0.5rem",
                                height: "30px",
                            }}
                            loading={addLoading}
                            disabled={disabled}
                            onClick={onAddItemHandler}
                        >
                            {stringFa.add_1}
                        </Button>

                    </div>
                </div>

            }
        </div >
    )
}

export default Block