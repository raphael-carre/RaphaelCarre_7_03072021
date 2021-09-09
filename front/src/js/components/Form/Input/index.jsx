import React from 'react'
import imageIconBlack from '@img/image-icon-black.svg'
import style from './style.scss'

export const Input = ({type, name, label, placeholder = '', error}) => (
    <>
        <label htmlFor={name} className={style.label}>{label}</label>
        <input id={name} type={type} name={name} placeholder={placeholder} className={style.input} />
        {error && error.key === name && <span className={style.errorSpan}>{error.message}</span>}
    </>
)

export const Textarea = ({name, label = null, placeholder = '', error}) => (
    <>
        {label && <label htmlFor={name} className={style.label}>{label}</label>}
        <textarea id={name} name={name} placeholder={placeholder} className={style.textarea}></textarea>
        {error && error.key === name && <span className={style.errorSpan}>{error.message}</span>}
    </>
)

export const ImageInput = ({handleFile}) => (
    <div className={style.imageInput}>
        <label htmlFor="imageInput" title="Ajoutez une image" className={style.imageInput__label}>
            <img src={imageIconBlack} alt="Charger une image" />
        </label>
        <input
            id="imageInput"
            type="file" 
            name="image" 
            accept="image/jpeg, image/jpg, image/gif, image/png"
            className={style.imageInput__field}
            onChange={handleFile}
        />
    </div>
)