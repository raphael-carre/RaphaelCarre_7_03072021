import React from 'react'
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