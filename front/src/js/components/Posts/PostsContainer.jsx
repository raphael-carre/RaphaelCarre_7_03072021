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
        setUpdatePost(allPosts.filter(post => post.id === id)[0])
    }

    const handleUpdate = async (e, id) => {
        e.preventDefault()

        const formData = createFormData()

        try {
            const response = await Request.apiCall(`/posts/${id}`, formData, 'PUT')

            if (response.error) throw response.data

            const postIndexToUpdate = allPosts.findIndex(post => post.id === id)
            allPosts[postIndexToUpdate] = {...response.data.data, User: updatePost.User}
            
            setError(false)
            setUpdatePost(null)

            modal.info(response.data.message)
        }
        catch (error) { setError(error) }
    }

    const handleFile = e => {
        setUpdatePost({...updatePost, image: e.target.files[0]})
    }

    const handleDeleteImage = () => {
        setUpdatePost({...updatePost, image: null})
    }

    const handleChangeContent = e => {
        setUpdatePost({...updatePost, content: e.target.value})
    }

    const handleResetForm = e => {
        e.preventDefault()
        setUpdatePost(null)
    }

    const createFormData = () => {
        let formData

        const {content, image} = updatePost

        if (image && typeof image !== 'string') {
            formData = new FormData()
            formData.append('datas', JSON.stringify({content}))
            formData.append('image', image)
        } 

        if (image && typeof image === 'string') {
            formData = { image, content }
        }

        if (!image) {
            formData = { image: null, content }
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
                updateMethods={{handleResetForm, handleUpdate, handleFile, handleDeleteImage, handleChangeContent}}
                updatePost={updatePost}
            />
        </>
    )
}

export default PostsContainer