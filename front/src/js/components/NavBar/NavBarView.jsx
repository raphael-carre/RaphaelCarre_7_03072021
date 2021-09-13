import React from 'react'
import { NavLink } from 'react-router-dom'
import homeIcon from '@img/home-icon.svg'
import profileIcon from '@img/profile-icon.svg'
import settingsIcon from '@img/settings-icon.svg'
import style from './style.scss'

const NavBarView = ({logout}) => (
    <nav className={style.navBar}>
        <NavLink to="/" title="Accueil" className={style.navLinks} activeClassName={style.navLinksActive} exact>
            <img src={homeIcon} alt="Fil d'actualité" />
        </NavLink>
        <NavLink to={`/profile/${localStorage.getItem('userId')}`} title="Profil" className={style.navLinks} activeClassName={style.navLinksActive}>
            <img src={profileIcon} alt="Profil" />
        </NavLink>
        <NavLink to="/settings" title="Paramètres" className={style.navLinks} activeClassName={style.navLinksActive}>
            <img src={settingsIcon} alt="Réglages" />
        </NavLink>
    </nav>
)

export default NavBarView