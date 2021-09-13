import Request from '@js/utils/classes/Request'
import React, { useState, useEffect, useRef, createContext } from 'react'
import Loader from '../Loader'
import Modal from '../Modal'

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
            setIsAuthenticated(false)
            localStorage.clear()
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

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [modalContent, setModalContent] = useState({content: null, type: 'message'})

    const resolver = useRef()

    useEffect(() => {
        if (modalContent.content && modalContent.type !== 'confirm') {
            const timeout = setTimeout(() => {
                setModalContent({content: null, type: 'message'})
                document.body.removeAttribute('style')
                clearTimeout(timeout)
            }, 2200)
        }
    })

    useEffect(() => {
        modalContent.content && (document.body.style.overflow = 'hidden')
    }, [modalContent])

    const info = content => {
        setModalContent({ content, type: 'message' })
    }

    const error = content => {
        setModalContent({ content, type: 'error' })
    }

    const confirm = content => {
        setModalContent({content, type: 'confirm'})

        return new Promise(resolve => {
            resolver.current = resolve
        })
    }

    const handleOk = () => {
        resolver.current && resolver.current(true)
        closeModal()
    }

    const handleNo = () => {
        resolver.current && resolver.current(false)
        closeModal()
    }

    const closeModal = () => {
        const timout = setTimeout(() => {
            setModalContent({content: null, type: 'message'})
            document.body.removeAttribute('style')
            clearTimeout(timout)
        }, 220)   
    }

    return (
        <ModalContext.Provider value={{info, error, confirm}}>
            {modalContent.content && <Modal content={modalContent.content} type={modalContent.type} confirmMethods={{handleOk, handleNo}} />}
            {children}
        </ModalContext.Provider>
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