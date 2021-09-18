import React from 'react'
import Comment from './components/Comment'
import { NewComment } from './components/NewComment'
import UpdateComment from './components/UpdateComment'
import style from './style.scss'

const CommentsView = ({
    postId,
    comments,
    setNewComment,
    updateComment,
    updateMethods,
    options
}) => (
    <div className={style.comments}>
        <NewComment postId={postId} setNewComment={setNewComment} />
        {comments && comments.map(
            data => 
                updateComment === data.id ?
                <UpdateComment
                    key={data.id}
                    data={data}
                    updateMethods={updateMethods}
                    options={options}
                /> :
                <Comment 
                    key={data.id}
                    data={data}
                    options={options}
                />
        )}
    </div>
)

export default CommentsView