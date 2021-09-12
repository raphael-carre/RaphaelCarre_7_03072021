import React from 'react'
import imageIconBlack from '@img/image-icon-black.svg'
import defaultProfileImage from '@img/profile.png'
import style from './style.scss'

export const Input = ({type, name, label, placeholder = '', error, value, handleChange}) => (
    <>
        <label htmlFor={name} className={style.label}>{label}</label>
        <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            className={style.input}
            value={value}
            onChange={handleChange}
            // required
        />
        {error && error.key === name && <span className={style.errorSpan}>{error.message}</span>}
    </>
)

export const Textarea = ({name, label = null, value = '', placeholder = '', error, handleChange = null}) => (
    <>
        {label && <label htmlFor={name} className={style.label}>{label}</label>}
        <textarea id={name} name={name} placeholder={placeholder} className={style.textarea} defaultValue={value} onChange={handleChange} />
        {error && error.key === name && <span className={style.errorSpan}>{error.message}</span>}
    </>
)

export const ImageInput = ({name, handleFile}) => (
    <div className={style.imageInput}>
        <label htmlFor={name || "newImageInput"} title="Ajoutez une image" className={style.imageInput__label}>
            <img src={imageIconBlack} alt="Charger une image" />
        </label>
        <input
            id={name || "newImageInput"}
            type="file" 
            name="image" 
            accept="image/jpeg, image/jpg, image/gif, image/png"
            className={style.imageInput__field}
            onChange={handleFile}
        />
    </div>
)

export const ProfileImageInput = ({handleFile, image}) => (
    <div className={style.profileImageInput}>
        <label htmlFor="profileImage" title="Modifier la photo du profil">
            {image ? <span className={style.profileImage} style={{backgroundImage: `url(${image})`}} /> :
            <img className={style.profileImage} src={defaultProfileImage} alt="Photo du profil" />}
        </label>
        <input
            id="profileImage"
            type="file"
            name="image"
            accept="image/jpeg, image/jpg, image/gif, image/png"
            className={style.imageInput__field}
            onChange={handleFile}
        />
    </div>
)