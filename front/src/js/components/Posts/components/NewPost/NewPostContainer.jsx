import React, { useState, useEffect } from 'react'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import NewPostView from './NewPostView'
import { useModal } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'

const NewPostContainer = ({setNewPost}) =>  {
    const userId = JSON.parse(localStorage.getItem('userId'))

    const [isLoading, setIsLoading] = useState(false)
    const [localLoading, setLocalLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null)

    const modal = useModal()

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    const getUser = async () => {
        try {
            const response = await Request.apiCall(`/users/${userId}`)

            if (response.error) throw response.data

            setError(false)
            setUser(response.data)
        }
        catch (error) { setError(error) }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }

        const content = e.target['content'].value

        const formData = createFormData(content)

        setLocalLoading(true)
        try {
            const response = await Request.apiCall('/posts', formData)

            if (response.error) throw response.data

            setError(false)
            setNewPost({...response.data.newPost, commentsCounter: 0, User})
            
            if (image) { setImage(null) }
            e.target['content'].value = ''

            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
        finally { setLocalLoading(false) }
    }

    const handleFile = e => {
        setImage(e.target.files[0])
    }

    const createFormData = content => {
        let formData

        if (image) {
            formData = new FormData()
            formData.append('datas', JSON.stringify({content}))
            formData.append('image', image)
        } else {
            formData = { content }
        }

        return formData
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} />}
            {user &&
            <NewPostView 
                currentUser={user}
                handleFile={handleFile}
                imagePreview={image}
                handleSubmit={handleSubmit}
                localLoading={localLoading}
                error={error}
            />}
        </>
    )
}

export default NewPostContainer