import React, { useState, useEffect } from 'react'
import CardHeadView from './CardHeadView'

const CardHeadContainer = ({data, options}) => {
    const isAllowed = localStorage.getItem('isAdmin') || parseInt(localStorage.getItem('userId')) === data.userId ? true : false

    const [isOpened, setIsOpened] = useState(false)

    let menuOptions = [{ name: 'Supprimer', run: options.delete }]
    data.userId === parseInt(localStorage.getItem('userId')) && (menuOptions = [{name: 'Modifier', run: options.modify }, ...menuOptions])

    const openMenu = e => {
        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            setIsOpened(!isOpened)
        }
    }

    return (
        <CardHeadView
            data={data}
            isAllowed={isAllowed}
            openMenu={openMenu}
            isOpened={isOpened}
            options={menuOptions}
        />
    )
}

export default CardHeadContainer