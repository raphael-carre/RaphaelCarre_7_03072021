import React from 'react'
import { CardHead } from '@js/components/CardHead'
import { ImageInput } from '@js/components/Form/Input'
import { Textarea } from '@js/components/Form/Input'
import { InteractionZone } from '../InteractionZone'
import style from './style.scss'
import DeleteImageButton from '@js/components/DeleteImageButton'

const UpdatePost = ({postData, options, updateMethods}) => (
    <article className={style.post}>
        <CardHead data={postData} options={options} />
            {(postData.image) &&
            <div className={style.post__image}>
                <DeleteImageButton handleDeleteImage={updateMethods.handleDeleteImage} />
                <img src={typeof postData.image !== 'string' ? URL.createObjectURL(postData.image) : postData.image} alt="" />
            </div>}
            <form onSubmit={e => updateMethods.handleUpdate(e, postData.id)}>
                <Textarea
                    name={`updateContentInput-${postData.id}`}
                    value={postData.content || ''}
                    handleChange={updateMethods.handleChangeContent}
                />
                <div className={style.post__modifyButtons}>
                    <ImageInput name="updateImageInput" handleFile={updateMethods.handleFile} />
                    <button className="btn btn--tertiary" onClick={updateMethods.handleResetForm}>Annuler</button>
                    <button className="btn btn--primary" type="submit">Modifier</button>
                </div>
            </form> 
        <InteractionZone postData={postData} />
    </article>
)

export default UpdatePost