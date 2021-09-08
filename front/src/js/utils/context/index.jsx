import Request from '@js/classes/Request'
import React, { useState, useEffect, createContext } from 'react'
import Loader from '../Loader'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) { setIsAuthenticated(true) }
    })

    useEffect(() => {
        if (isAuthenticated) { checkUserIsAdmin(localStorage.getItem('userId')) }
    }, [isAuthenticated])

    useEffect(() => {
        if (data && data.isAdmin) { localStorage.setItem('isAdmin', true) }
    }, [data])

    const checkUserIsAdmin = async (userId) => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(`/users/${userId}`)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setData(response.data)
        }
        catch (error) {
            console.log('AuthProvider', error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        isLoading ? <Loader /> :
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}