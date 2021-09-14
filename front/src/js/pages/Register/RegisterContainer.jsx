import Request from '@js/utils/classes/Request'
import { ModalContext } from '@js/utils/context'
import React, { useState, useEffect, useContext } from 'react'
import RegisterView from './RegisterView'

const RegisterContainer = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isRegistered, setIsRegistered] = useState(false)
    const modalContext = useContext(ModalContext)

    document.title = "Groupomania - Inscription"
    useEffect(() => {
        if (error && !error.key) {
            modalContext.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        if (values.password !== values.confirmPassword) {
            setError({key: 'confirmPassword', message: 'Vous devez saisir un mot de passe identique !'})
            setDisabled(true)
        } else {
            setError(false)
            setDisabled(Object.values(values).some(property => property === '')) ? true : false
        }
    }, [values])

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const register = async e => {
        e.preventDefault()

        const {confirmPassword, ...userData} = values

        setIsLoading(true)

        try {
            const response = await Request.apiCall('/users/register', userData)

            if (response.error) throw response.data

            setError(false)
            setIsRegistered(true)
        }
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
    }

    return (
        <RegisterView
            error={error}
            values={values}
            handleChange={handleChange}
            register={register}
            isRegistered={isRegistered}
            disabled={disabled}
        />
    )
}

export default RegisterContainer