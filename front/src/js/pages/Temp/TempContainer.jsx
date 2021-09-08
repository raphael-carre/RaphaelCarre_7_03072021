import React, { useState, useEffect } from 'react'
import { useFetch } from '@js/utils/hooks'
import TempView from './TempView'

const TempContainer = ({uri, userData = null}) => {
    const { isLoading, data, error } = useFetch(uri)
    const [message, setMessage] = useState('')

    // useEffect(() => {
    //     setMessage(error ? `Erreur ${error.statusCode} - ${error.message}` : 'Logged In !')
    // }, [error])

    // useEffect(() => {
    //     if (uri === '/users/login' && data !== null) {
    //         localStorage.setItem('userId', data.userId)
    //         localStorage.setItem('token', data.token)
    //     }
    // }, [data])

    useEffect(() => {
        if (data) {
            console.log('Fetch Result : ', data)
        }
    })
    // if (data) { console.log('Fetch Result : ', data) }

    return (
        isLoading ? <p>Chargement...</p> : <TempView message={message} />
    )
}

export default TempContainer
