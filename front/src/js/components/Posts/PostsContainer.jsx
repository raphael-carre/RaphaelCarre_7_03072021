import React, { useState, useEffect } from 'react'
import { useFetch } from '@js/utils/hooks'
import PostsView from './PostsView'
import Loader from '@js/utils/Loader'
import Request from '@js/utils/classes/Request'

const PostsContainer = ({uri, userId}) => {
    const isProfile = userId ? true : false
    const isOwner = parseInt(userId) === parseInt(localStorage.getItem('userId')) ? true : false

    const posts = useFetch(uri)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [allPosts, setAllPosts] = useState(null)
    const [newPost, setNewPost] = useState(null)

    const [image, setImage] = useState(null)
    const [updatePost, setUpdatePost] = useState(null)
    // const [deletedPost, setDeletedPost] = useState(null)

    useEffect(() => {
        setIsLoading(posts.isLoading)
        setError(posts.error)
        posts.data && allPosts === null && setAllPosts(posts.data)
    }, [posts])

    useEffect(() => {
        if (newPost !== null) {
            allPosts !== null ? setAllPosts([newPost, ...allPosts]) : setAllPosts([newPost])
        }
    }, [newPost])

    const deletePost = async id => {
        try {
            const response = await Request.apiCall(`/posts/${id}`, 'DELETE')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setAllPosts(allPosts.filter(post => post.id !== id))
            setError(false)
        }
        catch (error) { console.log('Il y a eu un problème') }
    }

    const modifyPost = id => {
        setUpdatePost(id)
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault()

        const content = e.target[`updateContentInput-${id}`].value
        
        let formData

        if (image && image !== 'none') {
            formData = new FormData()
            formData.append('datas', JSON.stringify({content}))
            formData.append('image', image)
        } 
        
        if (image && image === 'none') {
            formData = { image: null, content }
        } 

        if (!image) {
            formData = { content }
        }

        try {
            const response = await Request.apiCall(`/posts/${id}`, formData, 'PUT')

            if (response.error) {
                setError(response.data)
                throw new Error(response.data.message)
            }

            setError(false)
            const postIndexToUpdate = allPosts.findIndex(post => post.id === id)
            const User = allPosts[postIndexToUpdate].User
            allPosts[postIndexToUpdate] = {...response.data.data, User}
        }
        catch (error) { console.log('Il y a eu un problème') }
        finally { setUpdatePost(null) }
    }

    const handleFile = e => {
        setImage(e.target.files[0])
    }

    const handleResetForm = e => {
        e.preventDefault()
        setImage(null)
        setUpdatePost(null)
    }

    const options = [
        { name: 'Modifier', run: modifyPost },
        { name: 'Supprimer', run: deletePost }
    ]

    return (
        isLoading ? <Loader /> :
        error ? <p>{error.message}</p> : 
        allPosts && 
        <PostsView
            isProfile={isProfile}
            isOwner={isOwner}
            posts={allPosts}
            setNewPost={setNewPost}
            options={options}
            updateMethods={{handleResetForm, handleUpdate, handleFile}}
            updatePost={updatePost}
            image={image}
        />  
    )
}

export default PostsContainer