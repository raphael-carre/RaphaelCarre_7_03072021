import Request from '@js/utils/classes/Request'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { useModal } from '../hooks'
import Modal from '../Modal'
import Loader from '../Loader'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false)
    
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const {setShowLoader} = useContext(LoaderContext)
    const modal = useModal()
    
    useEffect(() => {
        setShowLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
        }
    }, [error])

    useEffect(() => {
        if (isAuthenticated) { checkUser(localStorage.getItem('userId')) }
    }, [isAuthenticated])

    useEffect(() => {
        if (data && data.isAdmin) { localStorage.setItem('isAdmin', true) }
        if (data) { localStorage.setItem('userData', JSON.stringify(data)) }
    }, [data])

    const checkUser = async userId => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(`/users/${userId}`)

            if (response.error) throw response.data

            setError(false)
            setData(response.data)
        }
        catch (error) {
            setError(error)
            setIsAuthenticated(false)
            localStorage.clear()
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {(data || !isAuthenticated) &&
            <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>}
        </>
    )
}

export const LoaderContext = createContext()

export const LoaderProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const setShowLoader = loading => {
        if (!isLoading && loading) {
            return setIsLoading(true)
        }

        if (isLoading && !loading) {
            const images = document.querySelectorAll('#root section article div:nth-of-type(2) img')

            if (images.length === 0) {
                return setIsLoading(false)
            }
            
            let counter = 0

            for (let image of images) {
                image.addEventListener('load', () => {
                    image.complete && counter++
                    if (counter === images.length) {
                        setFadeOut(true)
                        const timeout = setTimeout(() => {
                            setFadeOut(false)
                            setIsLoading(false)
                            clearTimeout(timeout)
                        }, 500)
                    }
                })
            }            
        }
    }

    return (
        <LoaderContext.Provider value={{setShowLoader}}>
            {isLoading && <Loader fadeOut={fadeOut} />}
            {children}
        </LoaderContext.Provider>
    )
}