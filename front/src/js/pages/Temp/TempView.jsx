import React from 'react'
import style from './style.scss'

const TempView = ({ message = 'Message par défaut' }) => (
    <section className={style.section}>
        {message}
    </section>
)

export default TempView