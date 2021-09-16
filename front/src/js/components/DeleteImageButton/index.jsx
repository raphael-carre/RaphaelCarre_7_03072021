import React from 'react'
import deleteButton from '@img/delete.svg'
import style from './style.scss'

const DeleteImageButton = ({handleDeleteImage}) => (
    <div onClick={handleDeleteImage} title="Supprimer l'image" className={style.deleteImageButton}>
        <img src={deleteButton} alt="Supprimer" />
    </div>
)

export default DeleteImageButton