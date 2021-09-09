import React from 'react'
import Comment from './components/Comment'
import { NewComment } from './components/NewComment'
import style from './style.scss'

const CommentsView = ({postId, comments, setNewComment, options}) => (
    <div className={style.comments}>
        <NewComment postId={postId} setNewComment={setNewComment} />
        {comments.map(
            data => <Comment key={data.id} data={data} options={options} />
        )}
    </div>
)

export default CommentsView