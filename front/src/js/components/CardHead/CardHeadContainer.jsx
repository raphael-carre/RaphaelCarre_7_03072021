import React, { useState } from 'react'
import CardHeadView from './CardHeadView'

const CardHeadContainer = ({data, options}) => {
    const isAllowed = localStorage.getItem('isAdmin') || parseInt(localStorage.getItem('userId')) === data.userId ? true : false

    const [isOpened, setIsOpened] = useState(false)

    const openMenu = () => {
        setIsOpened(!isOpened)
    }

    return (
        <CardHeadView
            data={data}
            isAllowed={isAllowed}
            openMenu={openMenu}
            isOpened={isOpened}
            options={options}
        />
    )
}

export default CardHeadContainer