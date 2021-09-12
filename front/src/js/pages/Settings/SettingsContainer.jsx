import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@js/utils/context'
import { ModalContext } from '@js/utils/context'
import SettingsView from './SettingsView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import { Redirect } from 'react-router-dom'

const SettingsContainer = () => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const modalContext = useContext(ModalContext)
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
        if (error && !error.key) {
            modalContext.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

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

            if (response.error) throw response.data

            setError(false)
            setValues(response.data)
        }
        catch (error) { setError(error) }
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
        const formData = createFormData(formName)

        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/users/${userId}`, formData, 'PUT')

            if (response.error) throw response.data

            setError(false)
            modalContext.info(response.data.message)
            if (formName === 'userData') { setValues(response.data.data) }
            if (formName === 'userPassword') {setPasswordValues({password: '', confirmPassword: ''})}
        }
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
    }

    const handleDeleteUser = async () => {
        const confirm = await modalContext.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')

        if (confirm) {
            setIsLoading(true)

            try {
                const response = await Request.apiCall(`/users/${userId}`, 'DELETE')

                if (response.error) throw response.data

                localStorage.clear()
                setIsAuthenticated(false)

                return <Redirect to="/" />
            }
            catch (error) { setError(error) }
            finally { setIsLoading(false) }
        }
    }

    const logout = () => {
        localStorage.clear()
        setIsAuthenticated(false)
    }

    const createFormData = formName => {
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

        return formData
    }

    return (
        // isLoading ? <Loader /> :
        values.id &&
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