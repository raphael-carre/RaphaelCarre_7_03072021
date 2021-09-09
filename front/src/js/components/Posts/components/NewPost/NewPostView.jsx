import React from 'react'
import defaultProfileImage from '@img/profile.png'
import { Textarea } from '@js/components/Form/Input'
import { ImageInput } from '@js/components/Form/Input'
import style from './style.scss'

const NewPostView = ({currentUser, handleFile, imagePreview, handleSubmit, error}) => (
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
                {imagePreview &&
                <div className={style.newPostDiv__imagePreview}>
                    <img src={URL.createObjectURL(imagePreview)} />    
                </div>}
                <Textarea name="content" error={error} />
                <div className={style.newPostDiv__buttons}>
                    <ImageInput handleFile={handleFile} />
                    <button type="submit">Publier</button>
                </div>
            </form>
        </div>
    </div>
)

export default NewPostView