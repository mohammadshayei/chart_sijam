import React from 'react'
import './ImageSection.scss'
import IMAGE from '../../../assets/images/signup.svg'
const ImageSection = (props) => {
    return (
        <div className='image-container'>
            <img src={IMAGE} alt="" />
        </div>
    )
}

export default ImageSection
