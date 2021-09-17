import React from 'react'
import style from './style.scss'

const EditionMenuView = ({openMenu, options, id, isOpened}) => (
    <>
        <div className={style.editionMenu__overlay} onClick={openMenu} />
        <div className={`${style.editionMenu} ${isOpened ? style.fadeOut : style.fadeIn}`}>
            <ul>
                {options.map(option => 
                    <li
                        key={`${option.name}-${id}`}
                        role="button"
                        tabIndex="0"
                        title={option.name}
                        onClick={e => option.run(e, id)}
                        onKeyDown={e => option.run(e, id)}
                    >
                        {option.name}
                    </li>)}
            </ul>
        </div>
    </>
)

export default EditionMenuView