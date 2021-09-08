import React from 'react'
import { CardHead } from '../CardHead'
import { InteractionZone } from '../InteractionZone'
import style from './style.scss'

const Post = ({postData, options}) => (
    <article className={style.post} data-id={postData.id}>
        <CardHead data={postData} options={options} />

        {postData.image &&
        <div className={style.post__image}>

        </div>}
        {postData.content &&
        <div className={style.post__content}>
            <p>{postData.content}</p>
        </div>}
        <InteractionZone postData={postData} />
    </article>
)

export default Post