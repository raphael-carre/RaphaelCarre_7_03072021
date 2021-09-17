import Request from '@js/utils/classes/Request'
import { useModal } from '@js/utils/hooks'
import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import Modal from '@js/utils/Modal'
import React, { useState, useEffect, useContext } from 'react'
import CommentsView from './CommentsView'

const CommentsContainer = ({postId, setCommentsCounter}) => {
    const fetchedComments = useFetch(`/comments/post/${postId}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState(null)
    const [updateComment, setUpdateComment] = useState(null)

    const modal = useModal()

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        setIsLoading(fetchedComments.isLoading)
        setError(fetchedComments.error)
        fetchedComments.data && comments === null && setComments(fetchedComments.data.comments)
    }, [fetchedComments])

    useEffect(() => {
        if (newComment !== null) {
            setCommentsCounter(comments.length + 1)
            comments !== null ? setComments([newComment, ...comments]) : setComments([newComment])
        }
    }, [newComment])

    const deleteComment = async (e, id) => {
        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            const confirm = await modal.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')
    
            if (confirm) {
                try {
                    const response = await Request.apiCall(`/comments/${id}`, 'DELETE')
        
                    if (response.error) throw response.data
        
                    setCommentsCounter(comments.length - 1)
                    setComments(comments.filter(comment => comment.id !== id))
                    setError(false)
                    modal.info(response.data.message)
                }
                catch (error) { setError(error) }
            }
        }
    }

    const modifyComment = (e, id) => {
        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            setUpdateComment(id)
        }
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault()
        const content = e.target[`updateCommentInput-${id}`].value

        try {
            const response = await Request.apiCall(`/comments/${id}`, {content}, 'PUT')

            if (response.error) throw response.data

            setError(false)
            const commentIndexToUpdate = comments.findIndex(comment => comment.id === id)
            const User = comments[commentIndexToUpdate].User
            comments[commentIndexToUpdate] = {...response.data.data, User}
            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
        finally { setUpdateComment(null) }
    }

    const handleResetForm = e => {
        e.preventDefault()
        setUpdateComment(null)
    }

    const options = {
        modify: modifyComment,
        delete: deleteComment
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} confirmMethods={modal.confirmMethods} />}
            {comments &&
            <CommentsView
                postId={postId}
                comments={comments}
                setNewComment={setNewComment}
                updateComment={updateComment}
                updateMethods={{handleUpdate, handleResetForm}}
                options={options}
            />}
        </>
    )
}

export default CommentsContainer