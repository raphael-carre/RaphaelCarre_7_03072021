import React, { useState, useEffect, useContext } from 'react'
import { useFetch } from '@js/utils/hooks'
import InteractionZoneView from './InteractionZoneView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import { ModalContext } from '@js/utils/context'

const InteractionZoneContainer = ({postData}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [likes, setLikes] = useState(null)
    const [commentsCounter, setCommentsCounter] = useState(postData.commentsCounter)
    const [loadComments, setLoadComments] = useState(false)

    const modalContext = useContext(ModalContext)

    useEffect(() => {
        fetchLikes(postData.id)
    }, [])

    useEffect(() => {
        if (error && !error.key) {
            modalContext.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    const fetchLikes = async postId => {
        setIsLoading(true)
        try {
            const response = await Request.apiCall(`/likes/posts/${postId}`)

            if (response.error) throw response.data

            setError(false)
            setLikes(response.data.filter(like => like.like))
        }
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
    }

    const toggleLike = async () => {
        try {
            const response = await Request.apiCall(`/likes/posts/${postData.id}`, 'POST')

            if (response.error) throw response.data

            modalContext.info(response.data.message)
            setError(false)
            fetchLikes(postData.id)
        }
        catch (error) { setError(error) }
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
            commentsCounter={commentsCounter}
            setCommentsCounter={setCommentsCounter}
            loadComments={loadComments}
            toggleComments={toggleComments}
        />
    )
}

export default InteractionZoneContainer