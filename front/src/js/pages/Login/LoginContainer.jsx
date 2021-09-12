import Request from '@js/utils/classes/Request'
import { ModalContext } from '@js/utils/context'
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
    const modalContext = useContext(ModalContext)

    useEffect(() => {
        if (error && !error.key) {
            modalContext.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

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

            if (response.error) throw response.data

            setError(false)
            setData(response.data)
        }
        catch (error) { setError(error) }
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