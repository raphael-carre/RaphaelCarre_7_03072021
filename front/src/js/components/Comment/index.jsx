import React from 'react'
import { CardHead } from '../CardHead'
import style from './style.scss'

const Comment = ({data, options}) => (
    <div className={style.comment}>
        <CardHead data={data} options={options} />
        <div>
            <p className={style.comment__content}>{data.content}</p>
        </div>
    </div>
)

export default Comment