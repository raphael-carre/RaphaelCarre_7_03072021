import Request from '@js/utils/classes/Request'
import { useModal } from '@js/utils/hooks'
import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import Modal from '@js/utils/Modal'
import React, { useState, useEffect, useContext } from 'react'
import NewCommentView from './NewCommentView'

const NewCommentContainer = ({postId, setNewComment}) => {
    const userData = useFetch(`/users/${localStorage.getItem('userId')}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)

    const modal = useModal()

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        setIsLoading(userData.isLoading)
        setError(userData.error)
        userData.data && setUser(userData.data)
    }, [userData])

    const handleSubmit = async e => {
        e.preventDefault()

        const User = {
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }

        const content = e.target['content'].value

        setIsLoading(true)

        try {
            const response = await Request.apiCall(`/comments/post/${postId}`, { content })

            if (response.error) throw response.data

            setError(false)
            setNewComment({...response.data.newComment, User})
            e.target['content'].value = ''
            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
    }

    return (
        // isLoading ? <Loader /> :
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {user && <NewCommentView currentUser={user} handleSubmit={handleSubmit} error={error} />}
        </>
    )
}

export default NewCommentContainer