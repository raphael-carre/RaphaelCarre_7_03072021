import React from 'react'
import style from './style.scss'
import pencil from '@img/pencil.svg'
import defaultProfileImage from '@img/profile.png'
import DateHandler from '@js/classes/DateHandler'
import { EditionMenu } from '../EdittionMenu'
import { Link } from 'react-router-dom'

const PostView = ({postData, options, openMenu, isOpened, isAllowed}) => (
    <article className={style.post} data-id={postData.id}>
        {isAllowed &&
        <img src={pencil} alt="Interagir" className={style.post__interact} onClick={openMenu} />}
        {isAllowed && isOpened &&
        <EditionMenu options={options} id={postData.id} openMenu={openMenu} isOpened={isOpened} />}
        <div className={style.post__head}>
            <Link to={`/profile/${postData.userId}`}>
                <img src={postData.image || defaultProfileImage} alt={`Photo de ${postData.User.firstName} ${postData.User.lastName}`} />
            </Link>
            <div>
                <h3 className={style.post__userName}>
                    <Link to={`/profile/${postData.userId}`}>
                        {postData.User.firstName} {postData.User.lastName}
                    </Link>
                </h3>
                <p className={style.post__date}>Publié {DateHandler.formatDateTime(postData.createdAt)}</p>
            </div>
        </div>
        {postData.image &&
        <div className={style.post__image}>

        </div>}
        {postData.content &&
        <div className={style.post__content}>
            <p>{postData.content}</p>
        </div>}
        <div>
            
        </div>
    </article>
)

export default PostView