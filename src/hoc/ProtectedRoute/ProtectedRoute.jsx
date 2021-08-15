import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.auth.token);
    const isLoggedIn = token !== null;
    const cmp = <Route {...rest} render={(props) => (
        isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login'}}/>
    )} />;
    return cmp;
}

export default ProtectedRoute;