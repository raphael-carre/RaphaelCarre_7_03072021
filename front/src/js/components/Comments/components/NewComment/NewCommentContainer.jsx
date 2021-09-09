import Request from '@js/utils/classes/Request'
import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import React, { useState, useEffect } from 'react'
import NewCommentView from './NewCommentView'

const NewCommentContainer = ({postId, setNewComment}) => {
    const userData = useFetch(`/users/${localStorage.getItem('userId')}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)

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

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setNewComment({...response.data.newComment, User})
            e.target['content'].value = ''
        }
        catch (error) { console.log('Il y a eu un problème') }
        finally { setIsLoading(false) }
    }

    return (
        // isLoading ? <Loader /> :
        error ? <p>{error.message}</p> :
        user &&
        <NewCommentView
            currentUser={user}
            handleSubmit={handleSubmit}
            error={error}
        />
    )
}

export default NewCommentContainer