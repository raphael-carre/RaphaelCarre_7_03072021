import React, { useContext } from 'react'
import { AuthContext } from '@js/utils/context'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...options}) => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <Route {...options} render={props => isAuthenticated ? <Component {...options} {...props} /> : <Redirect to="/login" />} />
    )
}

export default ProtectedRoute