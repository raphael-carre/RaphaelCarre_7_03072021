import Request from '@js/utils/classes/Request'
import { AuthContext } from '@js/utils/context'
import Loader from '@js/utils/Loader'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import LoginView from './LoginView'

const LoginContainer = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [values, setValues] = useState({email: '', password: ''})
    const [disabled, setDisabled] = useState(true)

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    useEffect(() => {
        setDisabled(Object.values(values).some(property => property === '')) ? true : false
    }, [values])

    useEffect(() => {
        if (data) {
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('token', data.token)
            setIsAuthenticated(true)
        }
    }, [data])

    const handleSubmit = e => {
        e.preventDefault()
        login(values)
    }

    const login = async values => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall('/users/login', values)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setData(response.data)
        }
        catch (error) { console.error('Il y a eu un problème') }
        finally { setIsLoading(false) }
    }

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        isLoading ? <Loader /> :
        isAuthenticated ? <Redirect to="/" /> :
        <LoginView
            handleSubmit={handleSubmit}
            error={error}
            values={values}
            handleChange={handleChange}
            disabled={disabled}
        />
    )
}

export default LoginContainer