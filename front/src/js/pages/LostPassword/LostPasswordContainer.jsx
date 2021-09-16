import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Request from '@js/utils/classes/Request'
import { AuthContext } from '@js/utils/context'
import { useModal } from '@js/utils/hooks'
import LostPasswordView from './LostPasswordView'
import Modal from '@js/utils/Modal'

const LostPasswordContainer = () => {
    const {isAuthenticated} = useContext(AuthContext)

    const modal = useModal()

    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const [values, setValues] = useState({
        email: '',
        code: '',
        sent: false,
        verified: false
    })

    const [passwordValues, setPasswordValues] = useState({
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        if (passwordValues.password !== passwordValues.confirmPassword) {
            setError({key: 'confirmPassword', message: 'Vous devez saisir un mot de passe identique !'})
        } else {
            setError(false)
        }
    }, [passwordValues])

    const handleChange = e => {
        if (e.target.name === 'code') {
            !isNaN(+e.target.value) && setValues({...values, [e.target.name]: e.target.value })
        } else {
            setValues({...values, [e.target.name]: e.target.value })
        }
    }

    const handlePasswordChange = e => {
        setPasswordValues({...passwordValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formName = e.target.name
        let uri, data

        switch (formName) {
            case 'sendCode' :
                uri = '/password/lost'
                data = { email: values.email }
                break
            case 'checkCode' :
                uri = '/password/verify'
                data = { email: values.email, code: parseInt(values.code) }
                break
            case 'sendNewPassword' :
                uri = '/password/reset'
                data = { email: values.email, code: parseInt(values.code), password: passwordValues.password}
                break
            default:
                uri = '/password/lost'
                data = { email: values.email }
        }

        try {
            const response = await Request.apiCall(uri, data)

            if (response.error) {
                if (formName === 'checkCode' && response.data.statusCode === 400) throw {...response.data, key: 'code'}
                throw response.data
            }

            modal.info(response.data.message)
            setError(false)

            switch (formName) {
                case 'sendCode' :
                    setValues({...values, sent: true})
                    break
                case 'checkCode' : 
                    setValues({...values, verified: true})
                    break
                case 'sendNewPassword' :
                    setValues({
                        email: '',
                        code: '',
                        sent: false,
                        verified: false
                    })
                    setPasswordValues({
                        password: '',
                        confirmPassword: ''
                    })

                    const timout = setTimeout(() => {
                        setRedirect(true)
                        clearTimeout(timout)
                    }, 2200)
                    break
            }
        }
        catch (error) { setError(error) }
    }

    return (
        isAuthenticated || redirect ? <Redirect to="/" /> :
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            <LostPasswordView
                values={values}
                passwordValues={passwordValues}
                handleChange={handleChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
                error={error}
            />
        </>
    )
}

export default LostPasswordContainer