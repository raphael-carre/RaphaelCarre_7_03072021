import React from 'react'
import deleteButton from '@img/delete.svg'
import style from './style.scss'

const DeleteImageButton = ({handleDeleteImage, outter}) => (
    <div
        onClick={handleDeleteImage}
        onKeyDown={handleDeleteImage}
        role="button"
        tabIndex="0"
        aria-label="Supprimer l'image"
        className={outter ? [style.deleteImageButton, style.outter].join(' ') : style.deleteImageButton}
    >
        <img src={deleteButton} alt="Supprimer" />
    </div>
)

export default DeleteImageButton