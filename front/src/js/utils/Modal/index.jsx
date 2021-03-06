import React from 'react'
import style from './style.scss'

const Modal = ({type, content, confirmMethods}) => (
    <div className={style.modal__overlay}>
        <div id="modal" className={style.modal__content}>
            <div className={type === 'error' ? style.modal__error : ''}>
                <p>{content}</p>
                {type === 'confirm' &&
                <div className={style.modal__buttons}>
                    <button onClick={confirmMethods.handleNo} className="btn btn--primary">Non</button>
                    <button onClick={confirmMethods.handleOk} className="btn btn--tertiary">Oui</button>
                </div>}
            </div>
        </div>
    </div>
)

export default Modal