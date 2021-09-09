import React from 'react'
import { CardHead } from '@js/components/CardHead'
import { ImageInput } from '@js/components/Form/Input'
import { Textarea } from '@js/components/Form/Input'
import { InteractionZone } from '../InteractionZone'
import style from './style.scss'

const UpdatePost = ({postData, options, updateMethods, image}) => (
    <article className={style.post}>
        <CardHead data={postData} options={options} />
            {(postData.image || image) &&
            <div className={style.post__image}>
                <img src={image ? URL.createObjectURL(image) : postData.image} alt="" />
            </div>}
            <form onSubmit={e => updateMethods.handleUpdate(e, postData.id)}>
                <Textarea name={`updateContentInput-${postData.id}`} value={postData.content || ''} />
                <div>
                    <ImageInput name="updateImageInput" handleFile={updateMethods.handleFile} />
                    <button onClick={updateMethods.handleResetForm}>Annuler</button>
                    <button type="submit">Modifier</button>
                </div>
            </form> 
        <InteractionZone postData={postData} />
    </article>
)

export default UpdatePost