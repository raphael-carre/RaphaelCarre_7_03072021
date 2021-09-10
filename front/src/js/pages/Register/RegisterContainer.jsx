import Request from '@js/utils/classes/Request'
import React, { useState, useEffect } from 'react'
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
        console.log(userData)

        setIsLoading(true)

        try {
            const response = await Request.apiCall('/users/register', userData)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setIsRegistered(true)
        }
        catch (error) { console.log('Il y a eu un problème') }
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