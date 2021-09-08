import Request from "@js/classes/Request"
import { useState, useEffect } from "react"

export const useFetch = (uri, userEntries = null) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchApi(uri, userEntries)
    }, [uri])

    const fetchApi = async (uri, data = null, method = null) => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(uri, data, method)

            if (response.error) { 
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setData(response.data)
        }
        catch (error) {
            setError(true)
            console.log(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return { isLoading, data, error }
}