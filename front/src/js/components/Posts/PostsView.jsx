import React from 'react'
import { NewPost } from '@js/components/NewPost'
import Post from '@js/components/Post'

const PostsView = ({isProfile, isOwner, posts, setNewPost, options}) => (
    <>
        {(!isProfile || (isProfile && isOwner)) &&
        <NewPost setNewPost={setNewPost} />}
        {posts.map(
            postData => <Post key={postData.id} postData={postData} options={options} />
        )}
    </>
)

export default PostsView