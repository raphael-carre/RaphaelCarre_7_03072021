import Request from '@js/classes/Request'
import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import React, { useState, useEffect, useM } from 'react'
import CommentsView from './CommentsView'

const CommentsContainer = ({postId}) => {
    const fetchedComments = useFetch(`/comments/post/${postId}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState(null)
    // const [deletedComment, setDeletedComment] = useState(null)

    useEffect(() => {
        setIsLoading(fetchedComments.isLoading)
        setError(fetchedComments.error)
        fetchedComments.data && comments === null && setComments(fetchedComments.data.comments.reverse())
    }, [fetchedComments])

    useEffect(() => {
        if (newComment !== null) {
            comments !== null ? setComments([newComment, ...comments]) : setComments([newComment])
        }
    }, [newComment])

    const deleteComment = async id => {
        try {
            const response = await Request.apiCall(`/comments/${id}`, 'DELETE')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setComments(comments.filter(comment => comment.id !== id))
            setError(false)
        }
        catch (error) { console.log('Il y a eu un problème') }
    }

    const modifyComment = () => {

    }

    const options = [
        { name: 'Modifier', run: modifyComment },
        { name: 'Supprimer', run: deleteComment }
    ]

    console.log(comments);

    return (
        // isLoading ? <Loader /> :
        error ? <p>{error.message}</p> :
        comments &&
        <CommentsView
            postId={postId}
            comments={comments}
            setNewComment={setNewComment}
            options={options}
        />
    )
}

export default CommentsContainer