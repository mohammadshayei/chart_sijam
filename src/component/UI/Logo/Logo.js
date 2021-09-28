import React from 'react';

import classes from './Logo.module.scss';

import { baseUrl } from '../../../constants/Config';

const Logo  = props => {
  
  return (
      <div className={classes.Logo} style={{...props.style}}>
          <img src={`${baseUrl}images/FekrTypo.png`} alt="Logo"/>  
      </div>
  );
}

export default Logo;