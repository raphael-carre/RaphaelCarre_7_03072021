import Request from "@js/utils/classes/Request"
import { useState, useEffect, useRef } from "react"

export const useFetch = (uri, userEntries = null) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    // const modalContext = useContext(ModalContext)

    // useEffect(() => {
    //     if (error && !error.key) {
    //         console.log(error.statusCode)
    //         modalContext.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
    //         setError(false)
    //     }
    // }, [error])

    useEffect(() => {
        fetchApi(uri, userEntries)
    }, [uri])

    const fetchApi = async (uri, data = null, method = null) => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(uri, data, method)

            if (response.error) throw response.data

            setError(false)
            setData(response.data)
        }
        catch (error) {
            // if (error.key) {
            //     setError(error)
            // } else {
            //     modalContext.error(error)
            // }
            setError(error)
        }
        finally { setIsLoading(false) }
    }

    return { isLoading, data, error }
}

export const useModal = () => {
    const [content, setContent] = useState(null)
    const [type, setType] = useState('message')

    const resolver = useRef()

    useEffect(() => {
        if (content && type !== 'confirm') {
            const timeout = setTimeout(() => {
                setContent(null)
                setType('message')
                document.body.removeAttribute('style')
                clearTimeout(timeout)
            }, 2200)
        }
    })

    useEffect(() => {
        content && (document.body.style.overflow = 'hidden')
    }, [content])

    const info = message => {
        setContent(message)
        setType('message')
    }

    const error = message => {
        setContent(message)
        setType('error')
    }

    const confirm = message => {
        setContent(message)
        setType('confirm')

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
            setContent(null)
            setType('message')
            document.body.removeAttribute('style')
            clearTimeout(timout)
        }, 220)   
    }

    const confirmMethods = { handleOk, handleNo }

    return { info, error, confirm, content, type, confirmMethods }
}