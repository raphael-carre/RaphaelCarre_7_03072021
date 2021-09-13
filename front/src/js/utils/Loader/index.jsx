import React from 'react'
import logo from '@img/logo.svg'
import style from './style.scss'

const Loader = ({fadeOut}) => (
    <div className={fadeOut ? [style.loader, style.fadeOut].join(' ') :style.loader}>
        <img src={logo} alt="Logo Groupomania" className={style.logo} />
        <p>Chargement...</p>
    </div>
)

export default Loader