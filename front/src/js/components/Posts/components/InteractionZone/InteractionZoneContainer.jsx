import React, { useState, useEffect } from 'react'
import InteractionZoneView from './InteractionZoneView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import { useModal } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'

const InteractionZoneContainer = ({postData, handleCommentsCounter}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [likes, setLikes] = useState(null)
    const [commentsCounter, setCommentsCounter] = useState(postData.commentsCounter)
    const [loadComments, setLoadComments] = useState(false)

    const modal = useModal()

    useEffect(() => {
        fetchLikes(postData.id)
    }, [])

    useEffect(() => {
        if (commentsCounter !== postData.commentsCounter) {
            handleCommentsCounter(postData.id, commentsCounter)
        }
    }, [commentsCounter])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
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

    const toggleLike = async e => {
        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            try {
                const response = await Request.apiCall(`/likes/posts/${postData.id}`, 'POST')
    
                if (response.error) throw response.data
    
                modal.info(response.data.message)
                setError(false)
                fetchLikes(postData.id)
            }
            catch (error) { setError(error) }
        }
    }

    const toggleComments = e => {
        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            setLoadComments(!loadComments)
        }
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {likes &&
            <InteractionZoneView
                postId={postData.id}
                likes={likes.filter(like => like.like)}
                toggleLike={toggleLike}
                commentsCounter={commentsCounter}
                setCommentsCounter={setCommentsCounter}
                loadComments={loadComments}
                toggleComments={toggleComments}
            />}
        </>
    )
}

export default InteractionZoneContainer