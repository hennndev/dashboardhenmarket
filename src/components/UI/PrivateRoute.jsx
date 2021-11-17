import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const admin = useSelector(state => state.admin)
    return <Route
        {...rest}
        render={(props) => {
            if(auth) {
                return !admin ? <Component {...props}/> : <Redirect to="/"/>
            }
            return admin ? <Component {...props}/> : <Redirect to="/login"/>
        }}
    
    />
}

export default PrivateRoute
