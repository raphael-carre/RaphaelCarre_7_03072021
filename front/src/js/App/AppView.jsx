import React from 'react'
import style from './style.scss'

const AppView = ({ message }) => (
    <div className={style.title}>
        <h1>React App Starter</h1>
        <p>{ message }</p>
    </div>
)

export default AppView