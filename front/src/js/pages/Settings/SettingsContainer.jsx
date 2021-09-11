import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@js/utils/context'
import SettingsView from './SettingsView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import { Redirect } from 'react-router-dom'
import { Modal } from '@js/utils/Modal'

const SettingsContainer = () => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const userId = localStorage.getItem('userId')
    
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
        confirmPassword: ''
    })

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        if (passwordValues.password !== passwordValues.confirmPassword) {
            setError({ key: 'confirmPassword', message: 'Vous devez saisir un mot de passe identique !' })
        } else {
            setError(false)
        }
    }, [passwordValues])

    const fetchUserData = async () => {
        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${userId}`)

            if (response.error) {
                setError(response.data)
                throw new Error
            }

            setError(false)
            setValues(response.data)
        }
        catch (error) {
            if (!error.key) { 
                setError({ message: 'Il y a eu un problème' })
                setTimeout(() => {
                    setError(false)
                }, 3000)
            }
        }
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

        const formName = e.target.name

        let formData

        if (formName !== 'userData' && formName !== 'userPassword') {
            throw new Error
        }

        if (formName === 'userData') {
            if (values.image && typeof values.image !== 'string') {
                const {image, ...userValues} = values
    
                formData = new FormData()
                formData.append('datas', JSON.stringify(userValues))
                formData.append('image', image)
            }
    
            if (!values.image || typeof values.image === 'string') {
                formData = values
            }
        }

        if (formName === 'userPassword') {
            formData = { password: passwordValues.password }
        }

        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${userId}`, formData, 'PUT')

            if (response.error) {
                setError(response.data)
                throw response.data
            }

            setError(false)
            if (formName === 'userData') { setValues(response.data.data) }
        }
        catch (error) { 
            if (!error.key) { 
                setError({ message: 'Il y a eu un problème' })
                setTimeout(() => {
                    setError(false)
                }, 3000)
            }
        }
        finally { setIsLoading(false) }
    }

    const handleDeleteUser = async () => {
        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${userId}`, 'DELETE')

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
        // isLoading ? <Loader /> :
        <>
            {error && !error.key && <Modal type="error" content={error.message} />}
            {values &&
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
            />}
        </>
    )
}

export default SettingsContainer