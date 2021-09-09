import React from 'react'
import { NewPost } from './components/NewPost'
import Post from './components/Post'
import UpdatePost from './components/UpdatePost'

const PostsView = ({
    isProfile,
    isOwner,
    posts,
    setNewPost,
    options,
    updatePost,
    updateMethods,
    image
}) => (
    <>
        {(!isProfile || (isProfile && isOwner)) &&
        <NewPost setNewPost={setNewPost} />}
        {posts.map(
            postData => 
                updatePost === postData.id ?
                <UpdatePost
                    key={postData.id}
                    postData={postData}
                    options={options}
                    updateMethods={updateMethods}
                    image={image}
                /> :
                <Post
                    key={postData.id}
                    postData={postData}
                    options={options}
                />
        )}
    </>
)

export default PostsView