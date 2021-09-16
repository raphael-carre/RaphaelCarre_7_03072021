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
    updateMethods
}) => (
    <>
        {(!isProfile || (isProfile && isOwner)) &&
        <NewPost setNewPost={setNewPost} />}
        {posts && posts.map(
            postData => 
                updatePost && updatePost.id === postData.id ?
                <UpdatePost
                    key={`update-${updatePost.id}`}
                    postData={updatePost}
                    options={options}
                    updateMethods={updateMethods}
                /> :
                <Post
                    key={`post-${postData.id}`}
                    postData={postData}
                    options={options}
                />
        )}
    </>
)

export default PostsView