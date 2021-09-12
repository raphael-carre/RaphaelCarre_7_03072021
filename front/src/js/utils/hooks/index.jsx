import Request from "@js/utils/classes/Request"
import { useState, useEffect, useContext } from "react"
import { ModalContext } from "../context"

export const useFetch = (uri, userEntries = null) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const modalContext = useContext(ModalContext)

    useEffect(() => {
        if (error && !error.key) {
            console.log(error.statusCode)
            modalContext.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

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
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
    }

    return { isLoading, data, error }
}