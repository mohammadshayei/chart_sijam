import React from 'react';

import './Spinner.scss'

const Spinner = props => {

    const spinnerClassName = ['Spinner', props.white ? 'SpinnerWhite' : ''];
    const circleClassName = ['Path', props.dark ? 'pathDark' : 'pathWhite'];

    return (
        <svg
            className={spinnerClassName.join(' ')}
            style={{
                width: props.width,
                height: props.height,
            }}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg">
            <circle className={circleClassName.join(' ')} fill="none" strokeWidth={props.strokeWidth ?? "6"} strokeLinecap="round" cx={props.cx ?? "33"} cy={props.cy ?? "33"} r={props.r ?? "30"}></circle>
        </svg>
    );
}

export default React.memo(Spinner);
