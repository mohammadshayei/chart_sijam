import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from '../../../store/actions/index';

import classes from './Login.module.scss';

const Login  = props => {
  const dispatch = useDispatch()
  const auth = () => {dispatch(actions.auth())};
  const checkAuth = () => dispatch(actions.authCheckState)

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userName = useRef(null);
  const password = useRef(null);

  
  const loginHandler = useCallback((e) => {
    e.preventDefault();
    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let redirect = null;
  if(token !== null ) {
    redirect = <Redirect to="/" />
  }

  return (
    <div className={classes.FromContainer}>
      {redirect}
      <form 
        className={classes.LoginForm}
        onSubmit={e => loginHandler(e)}>
        <div>
          <input 
            type="text" 
            placeholder="نام کاربری"
            ref={userName}/>
        </div>
        <div>
          <input 
            type="password" 
            placeholder="رمز عبور"
            ref={password}/>
        </div>
        <button 
          className={classes.SubmitButton}
          type="submit">ورود</button>
      </form>
    </div>
  );
}

export default Login;