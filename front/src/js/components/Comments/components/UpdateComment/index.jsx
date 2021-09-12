import { CardHead } from '@js/components/CardHead'
import { Textarea } from '@js/components/Form/Input'
import React from 'react'
import style from './style.scss'

const UpdateComment = ({data, options, updateMethods}) => (
    <div className={style.updateComment}>
        <CardHead data={data} options={options} />
        <form onSubmit={e => updateMethods.handleUpdate(e, data.id)}>
            <Textarea name={`updateCommentInput-${data.id}`} value={data.content} />
            <div className={style.updateComment__modifyButtons}>
                <button className="btn btn--tertiary" onClick={updateMethods.handleResetForm}>Annuler</button>
                <button className="btn btn--primary" type="submit">Modifier</button>
            </div>
        </form>
    </div>
)

export default UpdateComment