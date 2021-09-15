import React, { useState, useEffect, useContext } from 'react'
import { useFetch } from '@js/utils/hooks'
import PostsView from './PostsView'
import Request from '@js/utils/classes/Request'
import { LoaderContext } from '@js/utils/context'
import { useModal } from '@js/utils/hooks'
import Modal from '@js/utils/Modal'

const PostsContainer = ({uri, userId}) => {
    const isProfile = userId ? true : false
    const isOwner = parseInt(userId) === parseInt(localStorage.getItem('userId')) ? true : false

    const posts = useFetch(uri)
    const modal = useModal()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [allPosts, setAllPosts] = useState(null)
    const [newPost, setNewPost] = useState(null)

    const [image, setImage] = useState(null)
    const [updatePost, setUpdatePost] = useState(null)

    const {setShowLoader} = useContext(LoaderContext)

    useEffect(() => {
        setShowLoader(isLoading)
    }, [isLoading])

    useEffect(() => {
        if (error && !error.key) {
            modal.error(error.statusCode && error.statusCode !== 500 ? error.message : 'Il y a eu un problème')
            setError(false)
        }
    }, [error])

    useEffect(() => {
        setIsLoading(posts.isLoading)
        if (allPosts === null) {
            posts.error && setError(posts.data)
            posts.data && setAllPosts(posts.data)
        }
    }, [posts])

    useEffect(() => {
        if (newPost !== null) {
            allPosts !== null ? setAllPosts([newPost, ...allPosts]) : setAllPosts([newPost])
        }
    }, [newPost])

    const deletePost = async id => {
        const confirm = await modal.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')

        if (confirm) {
            try {
                const response = await Request.apiCall(`/posts/${id}`, 'DELETE')
    
                if (response.error) throw response.data
    
                setAllPosts(allPosts.filter(post => post.id !== id))
                setError(false)
                modal.info(response.data.message)
            }
            catch (error) { modal.error(error) }
        }
    }

    const modifyPost = id => {
        setUpdatePost(id)
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault()

        const content = e.target[`updateContentInput-${id}`].value
        
        const formData = createFormData(content)

        try {
            const response = await Request.apiCall(`/posts/${id}`, formData, 'PUT')

            if (response.error) throw response.data

            setError(false)
            setImage(null)
            const postIndexToUpdate = allPosts.findIndex(post => post.id === id)
            const User = allPosts[postIndexToUpdate].User
            allPosts[postIndexToUpdate] = {...response.data.data, User}
            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
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

    const createFormData = content => {
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

        return formData
    }

    const options = {
        modify: modifyPost,
        delete: deletePost
    }

    return (
        <>
            {modal.content && <Modal content={modal.content} type={modal.type} confirmMethods={modal.confirmMethods} />}
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
        </>
    )
}

export default PostsContainer