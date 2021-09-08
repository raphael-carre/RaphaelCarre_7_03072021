import React from 'react'
import logo from '@img/logo.svg'
import style from './style.scss'

const HeaderView = () => (
    <header className={style.title}>
        <div>
            <img src={logo} alt="Logo Groupomania" />
            <h1>Groupomania</h1>
        </div>
    </header>
)

export default HeaderView