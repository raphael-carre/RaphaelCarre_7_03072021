import React from 'react'
import style from './style.scss'

const ModalView = ({type, content}) => (
    <div className={style.modal__overlay}>
        <div className={style.modal__content}>
            <p className={type === 'error' ? style.modal__error : ''}>{content}</p>
        </div>
    </div>
)

export default ModalView