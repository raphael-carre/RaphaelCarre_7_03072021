import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '@img/home-icon.svg'
import profileIcon from '@img/profile-icon.svg'
import settingsIcon from '@img/settings-icon.svg'
import style from './style.scss'

const NavBarView = ({logout}) => (
    <nav className={style.navBar}>
        <Link to="/" className={style.navLinks}>
            <img src={homeIcon} alt="Fil d'actualité" />
        </Link>
        <Link to={`/profile/${localStorage.getItem('userId')}`} className={style.navLinks}>
            <img src={profileIcon} alt="Profil" />
        </Link>
        <Link to="/" className={style.navLinks} onClick={logout}>
            <img src={settingsIcon} alt="Réglages" />
        </Link>
    </nav>
)

export default NavBarView