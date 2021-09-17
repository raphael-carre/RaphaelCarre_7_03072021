import React from 'react'
import pencil from '@img/pencil.svg'
import DateHandler from '@js/utils/classes/DateHandler'
import { Link } from 'react-router-dom'
import { EditionMenu } from '../EditionMenu'
import ProfileImage from '../ProfileImage'
import style from './style.scss'

const CardHeadView = ({data, options, openMenu, isOpened, isAllowed}) => (
    <div className={style.cardHead__head}>
        <Link to={`/profile/${data.userId}`} title={`Accéder au profil de ${data.User.firstName} ${data.User.lastName}`}>
            <ProfileImage data={data.User} />
        </Link>
        <div>
            <h3 className={style.cardHead__userName}>
                <Link to={`/profile/${data.userId}`} title={`Accéder au profil de ${data.User.firstName} ${data.User.lastName}`}>
                    {data.User.firstName} {data.User.lastName}
                </Link>
            </h3>
            <p className={style.cardHead__date}>Publié {DateHandler.formatDateTime(data.createdAt)}</p>
        </div>
        {isAllowed &&
        <img 
            src={pencil}
            role="button"
            tabIndex="0"
            aria-label="Interagir"
            alt="Crayon"
            className={style.cardHead__interact}
            onClick={openMenu}
            onKeyDown={openMenu}
        />}
        {isAllowed && isOpened &&
        <EditionMenu options={options} id={data.id} userId={data.userId} openMenu={openMenu} isOpened={isOpened} />}
    </div>
)

export default CardHeadView