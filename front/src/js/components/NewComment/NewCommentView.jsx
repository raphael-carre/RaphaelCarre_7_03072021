import React from 'react'
import defaultProfileImage from '@img/profile.png'
import { Textarea } from '../Form/Input'
import style from './style.scss'

const NewCommentView = ({currentUser, handleSubmit, error}) => (
    <div className={style.newCommentDiv}>
        <div className={style.newCommentDiv__head}>
            <img src={currentUser.image || defaultProfileImage } alt={`Photo de ${currentUser.firstName} ${currentUser.lastName}`} />
            <div>
                <h3 className={style.newCommentDiv__userName}>{currentUser.firstName} {currentUser.lastName}</h3>
                <p className={style.newCommentDiv__info}>Ajoutez un commentaire :</p>
            </div>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <Textarea name="content" error={error} />
                <div className={style.newCommentDiv__buttons}>
                    <button type="submit">Commenter</button>
                </div>
            </form>
        </div>
    </div>
)

export default NewCommentView