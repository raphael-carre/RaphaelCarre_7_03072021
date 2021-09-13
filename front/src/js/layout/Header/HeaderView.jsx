import React from 'react'
import logo from '@img/logo.svg'
import style from './style.scss'
import { NavBar } from '@js/components/NavBar'

const HeaderView = ({isAuthenticated}) => (
    <header>
        <div className={style.title}>
            <div>
                <img src={logo} alt="Logo Groupomania" />
                <h1>Groupomania</h1>
            </div>
            {isAuthenticated && <NavBar />}
        </div>
    </header>
)

export default HeaderView