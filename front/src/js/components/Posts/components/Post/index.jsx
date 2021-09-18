import React from 'react'
import { CardHead } from '@js/components/CardHead'
import { InteractionZone } from '../InteractionZone'
import style from './style.scss'

const Post = ({postData, options}) => (
    <article className={style.post} data-id={postData.id}>
        <CardHead data={postData} options={options} />
        {postData.image &&
        <div className={style.post__image}>
            <img src={postData.image} alt="" data-type="postImage" />
        </div>}
        {postData.content &&
        <div className={style.post__content}>
            <p>{postData.content}</p>
        </div>}
        <InteractionZone postData={postData} />
    </article>
)

export default Post