import React from 'react'
import defaultProfileImage from '@img/profile.png'
import { Textarea } from '../Form/Input'
import style from './style.scss'

const NewPostView = ({currentUser, handleSubmit, error}) => (
    <div className={style.newPostDiv}>
        <div className={style.newPostDiv__head}>
            <img src={currentUser.image || defaultProfileImage } alt={`Photo de ${currentUser.firstName} ${currentUser.lastName}`} />
            <div>
                <h3 className={style.newPostDiv__userName}>{currentUser.firstName} {currentUser.lastName}</h3>
                <p className={style.newPostDiv__info}>Créez une publication :</p>
            </div>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <Textarea name="content" error={error} />
                <input type="file" name="image" accept="image/jpeg, image/jpg, image/gif, image/png" />
                <div className={style.newPostDiv__buttons}>
                    <button type="submit">Publier</button>
                </div>
            </form>
        </div>
    </div>
)

export default NewPostView