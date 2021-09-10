import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@js/utils/context'
import SettingsView from './SettingsView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import { Redirect } from 'react-router-dom'

const SettingsContainer = () => {
    const { setIsAuthenticated } = useContext(AuthContext)
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        id: null,
        firstName: '',
        lastName: '',
        description: '',
        image: '',
    })
    const [passwordValues, setPasswordValues] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        console.log(values);
    }, [values])

    const fetchUserData = async () => {
        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${localStorage.getItem('userId')}`)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setValues(response.data)
        }
        catch (error) { console.log('Il y a eu un problème') }
        finally { setIsLoading(false) }
    }

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handlePasswordChange = e => {
        setPasswordValues({...passwordValues, [e.target.name]: e.target.value})
    }

    const handleFile = e => {
        setValues({...values, image: e.target.files[0]})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        let formData

        if (values.image && typeof values.image !== 'string') {
            const {image, ...userValues} = values

            formData = new FormData()
            formData.append('datas', JSON.stringify(userValues))
            formData.append('image', image)
        }

        if (!values.image || typeof values.image === 'string') {
            formData = values
        }

        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${localStorage.getItem('userId')}`, formData, 'PUT')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setValues(response.data.data)
        }
        catch (error) { console.log(error.message) }
        finally { setIsLoading(false) }

        console.log(e.target.name)
    }

    const handleDeleteUser = async () => {
        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${localStorage.getItem('userId')}`, 'DELETE')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            localStorage.clear()
            setIsAuthenticated(false)

            return <Redirect to="/" />
        }
        catch (error) { console.log(error.message) }
        finally { setIsLoading(false) }
    }

    const logout = () => {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    return (
        isLoading ? <Loader /> :
        error ? <p>{error.message}</p> :
        values &&
        <SettingsView
            values={values}
            passwordValues={passwordValues}
            error={error}
            handleFile={handleFile}
            handleChange={handleChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            handleDeleteUser={handleDeleteUser}
            logout={logout}
        />
    )
}

export default SettingsContainer