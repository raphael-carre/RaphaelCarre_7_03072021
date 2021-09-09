import React, { useState, useEffect } from 'react'
import { useFetch } from '@js/utils/hooks'
import NewPostView from './NewPostView'
import Loader from '@js/utils/Loader'
import Request from '@js/classes/Request'

const NewPostContainer = ({setNewPost}) =>  {
    const userData = useFetch(`/users/${localStorage.getItem('userId')}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        setIsLoading(userData.isLoading)
        setError(userData.error)
        userData.data && setUser(userData.data)
    }, [userData])

    const handleSubmit = async e => {
        e.preventDefault()

        const User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }

        const content = e.target['content'].value

        let formData

        if (image) {
            formData = new FormData()
            formData.append('datas', JSON.stringify({content}))
            formData.append('image', image)
        } else {
            formData = { content }
        }

        setIsLoading(true)
        try {
            const response = await Request.apiCall('/posts', formData)

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            setNewPost({...response.data.newPost, User})
            e.target['content'].value = ''
            if (image) { setImage(null) }
        }
        catch (error) {
            console.log('Il y a eu un problème', error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleFile = e => {
        setImage(e.target.files[0])
    }

    return (
        isLoading ? <Loader /> :
        error ? <p>{error.message}</p> : 
        user && 
        <NewPostView 
            currentUser={user}
            handleFile={handleFile}
            imagePreview={image}
            handleSubmit={handleSubmit}
            error={error}
        />
    )
}

export default NewPostContainer