import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@js/utils/context'
import SettingsView from './SettingsView'
import Request from '@js/utils/classes/Request'
import { Redirect } from 'react-router-dom'
import { LoaderContext } from '@js/utils/context'
import { useFetch } from '@js/utils/hooks'
import { useModal } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'

const SettingsContainer = () => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const {setShowLoader} = useContext(LoaderContext)

    const userId = localStorage.getItem('userId')
    const userData = useFetch(`/users/${userId}`)
    
    const [isLoading, setIsLoading] = useState(false)
    const [localLoading, setLocalLoading] = useState(false)
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        id: null,
        firstName: '',
        lastName: '',
        description: '',
        image: ''
    })
    const [passwordValues, setPasswordValues] = useState({
        password: '',
        confirmPassword: ''
    })

    const modal = useModal()

    document.title = "Groupomania - Paramètres"

    useEffect(() => {
        setIsLoading(userData.isLoading)
        if (!values.id) {
            userData.error && setError(userData.data)
            userData.data && setValues(userData.data)
        }
    }, [userData])

    useEffect(() => {
        setShowLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        if (passwordValues.password !== '') {
            if (passwordValues.password !== passwordValues.confirmPassword) {
                setError({ key: 'confirmPassword', message: 'Vous devez saisir un mot de passe identique !' })
            } else {
                setError(false)
            }
        }
    }, [passwordValues])

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

        setLocalLoading(formName)

        try {
            const response = await Request.apiCall(`/users/${userId}`, formData, 'PUT')

            if (response.error) throw response.data

            setError(false)
            if (formName === 'userData') { setValues(response.data.data) }
            if (formName === 'userPassword') {setPasswordValues({password: '', confirmPassword: ''})}
            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
        finally { setLocalLoading(false) }
    }

    const handleDeleteUser = async () => {
        const confirm = await modal.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')

        if (confirm) {
            setIsLoading(true)

            try {
                const response = await Request.apiCall(`/users/${userId}`, 'DELETE')

                if (response.error) throw response.data

                setIsLoading(false)
                localStorage.clear()
                setIsAuthenticated(false)

                return <Redirect to="/" />
            }
            catch (error) { setError(error) }
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
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} confirmMethods={modal.confirmMethods} />}
            {values.id &&
            <SettingsView
                localLoading={localLoading}
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