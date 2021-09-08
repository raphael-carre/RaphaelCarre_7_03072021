import React from 'react'
import defaultProfileImage from '@img/profile.png'
import pencil from '@img/pencil.svg'
import DateHandler from '@js/classes/DateHandler'
import { Link } from 'react-router-dom'
import { EditionMenu } from '../EdittionMenu'
import style from './style.scss'

const CardHeadView = ({data, options, openMenu, isOpened, isAllowed}) => (
    <>
        {isAllowed &&
        <img src={pencil} alt="Interagir" className={style.cardHead__interact} onClick={openMenu} />}
        {isAllowed && isOpened &&
        <EditionMenu options={options} id={data.id} openMenu={openMenu} isOpened={isOpened} />}

        <div className={style.cardHead__head}>
            <Link to={`/profile/${data.userId}`}>
                <img src={data.User.image || defaultProfileImage} alt={`Photo de ${data.User.firstName} ${data.User.lastName}`} />
            </Link>
            <div>
                <h3 className={style.cardHead__userName}>
                    <Link to={`/profile/${data.userId}`}>
                        {data.User.firstName} {data.User.lastName}
                    </Link>
                </h3>
                <p className={style.cardHead__date}>Publié {DateHandler.formatDateTime(data.createdAt)}</p>
            </div>
        </div>
    </>
)

export default CardHeadView