import { hot } from 'react-hot-loader/root'
import React, { useState, useEffect } from 'react'
import AppView from './AppView'

const AppContainer = () => {
    const [message, setMessage] = useState('Test message from frontend service...')

    useEffect(() => {
        getMessage()
    }, [])

    const getMessage = async () => {
        const message = await fetch(`http://${location.hostname}:3080`)
            .then(res => res.ok && res.json())
            .then(json => json.message)
            .catch(error => console.log(error))
        
        message && setMessage(message)
    }

    return (
        <AppView message={message} />
    )
}

export default hot(AppContainer)
