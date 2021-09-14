import React, { useState, useEffect, useContext } from 'react'
import { useFetch } from '@js/utils/hooks'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'
import NewPostView from './NewPostView'
import { ModalContext } from '@js/utils/context'

const NewPostContainer = ({setNewPost}) =>  {
    const userData = useFetch(`/users/${localStorage.getItem('userId')}`)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null)

    const modalContext = useContext(ModalContext)

    useEffect(() => {
        if (error && !error.key) {
            modalContext.error(error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
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
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }

        const content = e.target['content'].value

        const formData = createFormData(content)

        setIsLoading(true)
        try {
            const response = await Request.apiCall('/posts', formData)

            if (response.error) throw response.data

            setError(false)
            setNewPost({...response.data.newPost, User})
            e.target['content'].value = ''
            if (image) { setImage(null) }
            modalContext.info(response.data.message)
        }
        catch (error) { setError(error) }
        finally { setIsLoading(false) }
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