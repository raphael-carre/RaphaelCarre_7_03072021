import React from 'react'
import { Post } from '@js/components/Post'
import { NewPost } from '@js/components/NewPost'

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