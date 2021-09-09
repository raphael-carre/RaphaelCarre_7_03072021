import React from 'react'
import style from './style.scss'

const EditionMenuView = ({openMenu, options, id, isOpened}) => (
    <>
        <div className={style.editionMenu__overlay} onClick={openMenu}></div>
        <div className={`${style.editionMenu} ${isOpened ? style.fadeOut : style.fadeIn}`}>
            <ul>
                {options.map(option => <li key={`${option.name}-${id}`} onClick={() => option.run(id)}>{option.name}</li>)}
            </ul>
        </div>
    </>
)

export default EditionMenuView