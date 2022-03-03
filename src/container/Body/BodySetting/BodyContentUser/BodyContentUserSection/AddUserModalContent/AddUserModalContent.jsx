import { useState, useEffect } from 'react'
import GetPhoneNumber from '../../../../../../component/GetPhoneNumber/GetPhoneNumber'
import VerifyCode from '../../../../../../component/VerifyCode/VerifyCode'
import "./AddUserModalContent.scss"

const AddUserModalContent = (props) => {
    const [page, setPage] = useState(1)
    const [pageIndex, setPageIndex] = useState(1)

    useEffect(() => {
        switch (pageIndex) {
            case 1:
                setPage(<GetPhoneNumber setPage={setPageIndex} />)
                break;
            case 2:
                setPage(<VerifyCode setPage={setPageIndex} />)
                break;
            case 3:
                setPage(<div>add?</div>)
                break;
            case 4:
                setPage(<div>create</div>)
                break;

            default:
                setPage(<GetPhoneNumber setPage={setPageIndex} />)
                break;
        }
    }, [pageIndex])

    return (
        <div className='add-user-content-wrapper'>
            {page}
        </div>
    )
}

export default AddUserModalContent