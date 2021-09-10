import React from 'react'
import ProfileImage from '@js/components/ProfileImage'
import { Textarea } from '@js/components/Form/Input'
import style from './style.scss'

const NewCommentView = ({currentUser, handleSubmit, error}) => (
    <div className={style.newCommentDiv}>
        <div className={style.newCommentDiv__head}>
            <ProfileImage data={currentUser} />
            <div>
                <h3 className={style.newCommentDiv__userName}>{currentUser.firstName} {currentUser.lastName}</h3>
                <p className={style.newCommentDiv__info}>Ajoutez un commentaire :</p>
            </div>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <Textarea name="content" error={error} />
                <div className={style.newCommentDiv__buttons}>
                    <button className="btn btn--primary" type="submit">Commenter</button>
                </div>
            </form>
        </div>
    </div>
)

export default NewCommentView