import React from 'react'
import thumbUpBlack from '@img/thumb-up-black.svg'
import thumbUpFilled from '@img/thumb-up-filled.svg'
import commentIcon from '@img/comment-icon-black.svg'
import style from './style.scss'
import { Comments } from '../Comments'

const InteractionZoneView = ({postId, likes, toggleLike, commentsCounter, loadComments, toggleComments}) => (
    <>
        <div className={style.interactionZone}>
            <div className={style.interactionZone__likes}>
                <div onClick={toggleLike}>
                    <img 
                        src={
                            likes.filter(
                                like => like.userId === parseInt(localStorage.getItem('userId'))
                            ).length === 1 ? thumbUpFilled : thumbUpBlack
                        } 
                        alt="J'aime"
                    />
                </div>
                <p>{likes.length > 0 ? likes.length : ''}</p>
            </div>
            <div className={style.interactionZone__comments} onClick={toggleComments}>
                <div>
                    <img src={commentIcon} alt="Commentaire" />
                </div>
                <p>{commentsCounter > 0 ? commentsCounter : 'aucun'} commentaire{commentsCounter > 1 && 's'}</p>
            </div>
        </div>
        {loadComments && <Comments postId={postId} />}
    </>
)

export default InteractionZoneView