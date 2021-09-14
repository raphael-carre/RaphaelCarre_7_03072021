import React from 'react'
import style from './style.scss'

const Error404 = () => {
    document.title = "Groupomania - Erreur 404"

    return (
        <section className={style.errorMessage}>
            <p className={style.errorMessage__error}>ERREUR</p>
            <p className={style.errorMessage__code}>404</p>
            <p className={style.errorMessage__content}>
                La page que vous recherchez n'existe pas !
            </p>
        </section>
    )
}

export default Error404