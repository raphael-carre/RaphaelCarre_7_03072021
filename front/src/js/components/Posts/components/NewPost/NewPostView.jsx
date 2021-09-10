import React from 'react'
import { Textarea } from '@js/components/Form/Input'
import ProfileImage from '@js/components/ProfileImage'
import { ImageInput } from '@js/components/Form/Input'
import style from './style.scss'

const NewPostView = ({currentUser, handleFile, imagePreview, handleSubmit, error}) => (
    <div className={style.newPostDiv}>
        <div className={style.newPostDiv__head}>
            <ProfileImage data={currentUser} />
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
                    <button className="btn btn--primary" type="submit">Publier</button>
                </div>
            </form>
        </div>
    </div>
)

export default NewPostView