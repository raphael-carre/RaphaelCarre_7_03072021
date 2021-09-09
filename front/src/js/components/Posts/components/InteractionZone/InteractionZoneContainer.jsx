import React, { useState, useEffect } from 'react'
import { useFetch } from '@js/utils/hooks'
import InteractionZoneView from './InteractionZoneView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'

const InteractionZoneContainer = ({postData}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [likes, setLikes] = useState(null)
    const [loadComments, setLoadComments] = useState(false)

    useEffect(() => {
        fetchLikes(postData.id)
    }, [])

    const fetchLikes = async postId => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(`/likes/posts/${postId}`)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setLikes(response.data.filter(like => like.like))
        }
        catch (error) { console.log(error) }
        finally { setIsLoading(false) }
    }

    const toggleLike = async () => {
        try {
            const response = await Request.apiCall(`/likes/posts/${postData.id}`, 'POST')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            console.log(response.data.message)
            setError(false)
            fetchLikes(postData.id)
        }
        catch (error) { console.log(error) }
    }

    const toggleComments = () => {
        setLoadComments(!loadComments)
    }

    return (
        // isLoading ? <Loader /> :
        error ? <p>{error.message}</p> :
        likes &&
        <InteractionZoneView
            postId={postData.id}
            likes={likes.filter(like => like.like)}
            toggleLike={toggleLike}
            commentsCounter={postData.commentsCounter}
            loadComments={loadComments}
            toggleComments={toggleComments}
        />
    )
}

export default InteractionZoneContainer