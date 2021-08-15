import React from 'react';

import classes from './Logo.module.scss';

import LogoIcon from '../../../assets/images/simamIcon.png'

const Logo  = props => {
  return (
      <div className={classes.Logo} style={{...props.style}}>
          <img src={LogoIcon} alt="Logo"/>  
      </div>
  );
}

export default Logo;