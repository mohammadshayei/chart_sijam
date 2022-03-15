import { useState, useEffect } from 'react'
import "./AddUserModalContent.scss"
import GetPhoneNumber from '../../../../../../component/GetPhoneNumber/GetPhoneNumber'
import VerifyCode from '../../../../../../component/VerifyCode/VerifyCode'
import AddUserSection from './AddUserSection'
import CreateUserSection from './CreateUserSection'

const AddUserModalContent = (props) => {
    const [page, setPage] = useState(1)
    const [pageIndex, setPageIndex] = useState(1)
    const [otp, setOtp] = useState(null)
    const [error, setError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");



    useEffect(() => {
        switch (pageIndex) {
            case 1:
                setPage(<GetPhoneNumber setPage={setPageIndex} setOtp={setOtp} setError={setError} setPhone={setPhoneNumber} />)
                break;
            case 2:
                setPage(<VerifyCode setPage={setPageIndex} otp={otp} setError={setError} phone={phoneNumber} />)
                break;
            case 3:
                setPage(<AddUserSection setPage={setPageIndex} close={props.close} setError={setError} phone={phoneNumber} />)
                break;
            case 4:
                setPage(<CreateUserSection setPage={setPageIndex} close={props.close} setError={setError} phone={phoneNumber} />)
                break;

            default:
                setPage(<GetPhoneNumber setPage={setPageIndex} setOtp={setOtp} setError={setError} setPhone={setPhoneNumber} />)
                break;
        }
        return () => {
            setPage(null)
        }
    }, [pageIndex])

    return (
        <div className='add-user-content-wrapper'>
            {error}{page}
        </div>
    )
}

export default AddUserModalContent